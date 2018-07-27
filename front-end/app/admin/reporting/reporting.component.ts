import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from "../../service/admin.service";
import { ErrorService } from '../../service/error.service';
import * as moment from 'moment';
import { Order } from '../../../../shared/domain-entities';

@Component({
    templateUrl: './reporting.component.html',
    styleUrls: [`./reporting.component.scss`]
})
export class ReportingComponent {
    monthlyData: PeriodData[];
    bestMonthlyTotalOrderValue: number;
    weeklyData: PeriodData[];
    bestWeeklyTotalOrderValue: number;

    constructor(private adminService: AdminService, private errorService: ErrorService, private router: Router) {
        this.initialise();
    }

    private async initialise() {
        try {
            let orders = (await this.adminService.getOrders()).filter(x => x.status === "Complete");
            this.monthlyData = getPeriodData(orders, x => moment(x.date).startOf("month").toDate(), x => moment(x).format("MMM YY"));
            this.bestMonthlyTotalOrderValue = this.monthlyData.slice().sort((a, b) => b.totalOrderValue - a.totalOrderValue)[0].totalOrderValue;
            this.weeklyData = getPeriodData(orders, x => moment(x.date).startOf("isoWeek").toDate(), x => moment(x).format("DD MMM YY"));
            this.bestWeeklyTotalOrderValue = this.weeklyData.slice().sort((a, b) => b.totalOrderValue - a.totalOrderValue)[0].totalOrderValue;
        } catch (error) {
            this.handleError(error, 'There was an unexpected error retrieving the orders.')
        }
    }

    private handleError(error: any, genericErrorMessage: string) {
        if (error.status === 401) {
            this.router.navigateByUrl('/admin/sign-in');
        }
        if (error.status === 500) {
            this.errorService.displayErrors([genericErrorMessage]);
        }
    }
}

function getPeriodData(orders: Order[], getPeriodStart: (x: Order) => Date, getPeriodLabel: (x: Date) => string): PeriodData[] {
    let periodData = new Map<number, PeriodData>();
    for (let order of orders) {
        let start = getPeriodStart(order);
        if (periodData.has(start.valueOf()) === false) {
            periodData.set(start.valueOf(), { start, label: getPeriodLabel(start), numberOfOrders: 0, totalOrderValue: 0, totalDiscountValue: 0, totalPaymentValue: 0, totalVoucherValue: 0 });
        }
        let data = periodData.get(start.valueOf());
        data.numberOfOrders++;
        data.totalOrderValue += order.total;
        data.totalPaymentValue += order.totalPayment;
        data.totalVoucherValue += order.voucher ? order.voucher.amount : 0;
        data.totalDiscountValue += order.discount ? order.discount.amount : 0;
    }
    return Array.from(periodData.values()).sort((a, b) => a.start.valueOf() - b.start.valueOf());
}

interface PeriodData {
    start: Date;
    label: string;
    numberOfOrders: number;
    totalOrderValue: number;
    totalVoucherValue: number;
    totalDiscountValue: number;
    totalPaymentValue: number;
}
