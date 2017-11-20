import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from "../../service/admin.service";
import { ErrorService } from '../../service/error.service';
import * as moment from 'moment';

@Component({
    templateUrl: './customers.component.html',
    styleUrls: [`./customers.component.scss`]
})
export class CustomersComponent {
    customers: Customer[] = [];
    isDetailsExpanded: { [customerEmail: string]: boolean } = {};
    isVouchersExpanded: { [customerEmail: string]: boolean } = {};
    MIN_VOUCHER_AMOUNT = 2;
    MAX_VOUCHER_AMOUNT = 5;
    voucherAmount: number = this.MIN_VOUCHER_AMOUNT;

    constructor(private adminService: AdminService, private errorService: ErrorService, private router: Router) {
        this.initialise();
    }

    private async initialise() {
        let ordersPromise = this.adminService.getOrders();
        let vouchersPromise = this.adminService.getVouchers();

        try {
            let orders = (await ordersPromise).filter(x => x.status === "Complete");
            let ordersByEmailAddress: { [email: string]: Order[] } = {};
            for (let order of orders) {
                if (ordersByEmailAddress[order.buyer.email] === undefined) {
                    ordersByEmailAddress[order.buyer.email] = [];
                }
                ordersByEmailAddress[order.buyer.email].push(order);
            }

            let customers = Object.keys(ordersByEmailAddress)
                .map<Customer>(x => ({ email: x, orders: ordersByEmailAddress[x], vouchers: [] }));

            let vouchers = await vouchersPromise;
            for (let customer of customers) {
                customer.vouchers = vouchers.filter(x => x.email === customer.email);
            }
            this.customers = customers.sort((a, b) => this.compareCustomers(a, b));
        } catch (error) {
            this.handleError(error, 'There was an unexpected error refreshing the customers. Please try again.')
        }
    }

    private handleError(error: any, genericErrorMessage: string) {
        if (error.status === 401) {
            this.router.navigateByUrl('/admin/sign-in');
        }
        if (error.status === 403) {
            this.router.navigateByUrl('/admin/orders');
        }
        if (error.status === 500) {
            this.errorService.displayErrors([genericErrorMessage]);
        }
    }

    async sendVoucher(customer: Customer) {
        this.errorService.clearErrors();
        if (this.voucherAmount < this.MIN_VOUCHER_AMOUNT) {
            this.errorService.displayErrors([`You can't send a voucher less than £${this.MIN_VOUCHER_AMOUNT}`]);
            return;
        }
        if (this.voucherAmount > this.MAX_VOUCHER_AMOUNT) {
            this.errorService.displayErrors([`You can't send a voucher more than £${this.MAX_VOUCHER_AMOUNT}`]);
            return;
        }
        if (!window.confirm("Are you sure you want to send this voucher?")) {
            return;
        }
        try {
            await this.adminService.createVoucher({ amount: this.voucherAmount, email: customer.email });
            this.voucherAmount = this.MIN_VOUCHER_AMOUNT;
            await this.initialise();
        } catch (error) {
            this.handleError(error, "There was an error creating the voucher. Please try again.");
        }
    }

    getNames(customer: Customer) {
        return distinct(customer.orders.map(x => `${x.buyer.firstName} ${x.buyer.lastName}`));
    }

    getPhones(customer: Customer) {
        return distinct(customer.orders.map(x => x.buyer.phone));
    }

    getAddresses(customer: Customer) {
        return distinct(
            customer.orders
                .filter(x => x.deliveryMethod === 'Delivery')
                .map(x => [
                    x.deliveryAddress.line1,
                    x.deliveryAddress.line2,
                    x.deliveryAddress.town,
                    x.deliveryAddress.postcode
                ].filter(x => !!x).join(', '))
        );
    }

    toggleDetails(customer: Customer) {
        this.isDetailsExpanded[customer.email] = !this.isShowDetails(customer);
    }

    isShowDetails(customer: Customer) {
        return this.isDetailsExpanded[customer.email] === true;
    }

    toggleVouchers(customer: Customer) {
        this.isVouchersExpanded[customer.email] = !this.isShowVouchers(customer);
    }

    isShowVouchers(customer: Customer) {
        return this.isVouchersExpanded[customer.email] === true;
    }

    getOrdersCount30d(customer: Customer) {
        return customer.orders.filter(isLessThan30DaysOld).length;
    }

    getOrderTotal30d(customer: Customer) {
        return customer.orders.filter(isLessThan30DaysOld)
            .reduce((total, order) => total += order.totalPayment, 0);
    }

    getOrdersCountAll(customer: Customer) {
        return customer.orders.length;
    }

    getOrderTotalAll(customer: Customer) {
        return customer.orders
            .reduce((total, order) => total += order.totalPayment, 0);
    }

    getCurrentVouchers(customer: Customer) {
        return customer.vouchers.filter(x => x.dateUsed === null && (new Date() < new Date(x.expiryDate))).length;
    }

    getExpiredVouchers(customer: Customer) {
        return customer.vouchers.filter(x => x.dateUsed === null && (new Date() > new Date(x.expiryDate))).length;
    }

    getUsedVouchers(customer: Customer) {
        return customer.vouchers.filter(x => x.dateUsed !== null).length;
    }

    compareCustomers(a: Customer, b: Customer): number {
        let aOrders = this.getOrdersCountAll(a);
        let bOrders = this.getOrdersCountAll(b);
        if (bOrders !== aOrders) {
            return bOrders - aOrders;
        }
        return this.getOrdersCount30d(b) - this.getOrdersCount30d(a);
    }

    getDateIssued(voucher: Voucher) {
        return moment(voucher.dateIssued).format('dddd Do MMM [at] HH:mm');
    }

    getExpiryDate(voucher: Voucher) {
        return moment(voucher.expiryDate).format('dddd Do MMM [at] HH:mm');
    }

    getDateUsed(voucher: Voucher) {
        if (voucher.dateUsed) {
            return moment(voucher.dateUsed).format('dddd Do MMM [at] HH:mm');
        }
        if (new Date() > new Date(voucher.expiryDate)) {
            return "Expired";
        }
        return "Not yet used";
    }
}

function isLessThan30DaysOld(order: Order) {
    return (new Date().getTime() - new Date(order.date).getTime()) < (30 * 24 * 60 * 60 * 1000);
}

function distinct(array: Array<string>) {
    let values: { [key: string]: string } = {};
    for (let value of array) {
        values[value.toLowerCase()] = value;
    }
    return Object.values(values);
}

interface Customer {
    email: string;
    orders: Order[];
    vouchers: Voucher[];
}
