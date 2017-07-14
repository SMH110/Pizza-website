import { Component } from '@angular/core';
import { AdminService } from "../../service/admin.service";

@Component({
    templateUrl: './customers.component.html',
    styleUrls: [`./customers.component.scss`]
})
export class CustomersComponent {
    customers: Customer[] = [];
    isDetailsExpanded: { [customerEmail: string]: boolean } = {};
    isVouchersExpanded: { [customerEmail: string]: boolean } = {};

    constructor(private adminService: AdminService) {
        this.initialise();
    }

    private async initialise() {
        let ordersPromise = this.adminService.getOrders();
        let vouchersPromise = this.adminService.getVouchers();

        let orders = await ordersPromise;
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
        this.customers = customers;
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
        return customer.vouchers.filter(x => x.dateUsed === null).length;
    }

    getUsedVouchers(customer: Customer) {
        return customer.vouchers.filter(x => x.dateUsed !== null).length;
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
