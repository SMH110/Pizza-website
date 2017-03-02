import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../service/order.service';
import { ErrorService } from '../service/error.service';
import { BasketService } from '../service/basket.service';
import * as moment from 'moment';

@Component({
    templateUrl: './orders.component.html',
    styleUrls: [`./orders.component.scss`]
})
export class OrdersComponent implements OnInit {
    orders: OrderViewModel[] = [];
    isOrderExpandedOverride: { [orderId: string]: boolean } = {};

    constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router) {
    }

    ngOnInit() {
        this.refreshOrders();
        setInterval(this.refreshOrders.bind(this), 60000);
    }

    markAsComplete(order: OrderViewModel) {
        this.errorService.clearErrors();
        this.orderService.markOrderAsComplete({ orderId: order._id })
            .subscribe(() => {
                this.refreshOrders();
                delete this.isOrderExpandedOverride[order._id];
            }, error => this.handleError(error, 'There was an unexpected error marking the order as complete. Please try again.'));
    }

    private refreshOrders() {
        this.errorService.clearErrors();
        this.orderService.getOrders()
            .subscribe(response => {
                this.orders = response.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
                this.orders = this.orders.map(order => {

                    return Object.assign({ isExpanded: order.status === 'Outstanding' ? true : false }, order)
                })
            }, error => this.handleError(error, 'There was an unexpected error refreshing the orders. Please try again.'));
    }

    private handleError(error: any, genericErrorMessage: string) {
        if (error.status === 401) {
            this.router.navigateByUrl('/admin/sign-in');
        }
        if (error.status === 500) {
            this.errorService.displayErrors([genericErrorMessage]);
        }
    }

    toggleIsExpanded(order: OrderViewModel): void {
        this.isOrderExpandedOverride[order._id] = !this.isOrderExpanded(order);
    }

    isOrderExpanded(order: OrderViewModel): boolean {
        let isExpandedOverride = this.isOrderExpandedOverride[order._id];
        return isExpandedOverride !== undefined ? isExpandedOverride : (order.status === 'Outstanding');
    }

    formatAddress(address: Address) {
        return [
            address.line1,
            address.line2,
            address.town,
            address.postcode
        ].filter(x => !!x).join(', ');
    }

    navigateToGoogleMap(address: Address): string {
        return `http://maps.google.com/maps?&q=${encodeURIComponent(this.formatAddress(address) + ', GB')}&z=16`
    }

    getOrderDate(order: Order) {
        return moment(order.date).format('dddd Do MMM, HH:mm')
    }

    getDescription(item: BasketItem) {
        return BasketService.getDescription(item);
    }

    trackByOrderId(order: OrderViewModel) {
        return order._id
    }

    isShowCustomerAddress(order: OrderViewModel) {
        return order.deliveryMethod === 'Collection' && order.paymentMethod === 'Cash';
    }

    ordersToShow() {
        return this.orders.filter(x => x.status !== 'Awaiting Payment');
    }
}

interface OrderViewModel extends Order {
    _id?: string;
}
