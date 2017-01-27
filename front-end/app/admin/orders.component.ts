import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../service/order.service'
import { ErrorService } from '../service/error.service'

@Component({
    moduleId: module.id,
    templateUrl: './orders.component.html',
    styles: [`
    h4 {
        display: inline-block;
    }
   .mark-complete{
       padding: 0 16px;
       margin-left: 20px;
   }

 .more-details{
       min-width: 400px;
       margin-top:20px;
   }

   .remove-right-border{
       border-right: 0;
   }
    `]
})
export class OrdersComponent implements OnInit {
    orders: OrderViewModel[];
    expandStatus: ExpandStatus[] = [];
    constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router) {
    }

    ngOnInit() {
        this.refreshOrders();
        setInterval(this.refreshOrders.bind(this), 5000);
    }

    markAsComplete(id: string) {
        this.errorService.clearErrors();
        this.orderService.markOrderAsComplete({ orderId: id })
            .subscribe(() => {
                this.refreshOrders()
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
        let locallyStoredStatus = this.expandStatus.find(x => x.id === order._id);
        if (!locallyStoredStatus) {
            locallyStoredStatus = {
                id: order._id,
                isExpanded: !order.isExpanded
            }
            this.expandStatus.push(locallyStoredStatus);
        } else {
            locallyStoredStatus.isExpanded = !order.isExpanded;
            this.toggleIsExpandedButtonName(order)
        }
        order.isExpanded = !order.isExpanded;
    }

    getExpandedStatus(order: OrderViewModel): boolean {
        let locallyStoredStatus = this.expandStatus.find(x => x.id === order._id);
        if (locallyStoredStatus) {
            return locallyStoredStatus.isExpanded;
        }
        return order.isExpanded
    }
    toggleIsExpandedButtonName(order: OrderViewModel): string {
        let locallyStoredStatus = this.expandStatus.find(x => x.id === order._id);
        if (locallyStoredStatus) {
            return locallyStoredStatus.isExpanded ? 'Collapse' : 'Expand';
        }
        return order.isExpanded ? 'Collapse' : 'Expand';
    }

    formatAddress(address: Address) {
        return [
            address.line1,
            address.line2,
            address.town,
            address.postcode
        ].filter(x => !!x).join(', ');
    }
}

interface OrderViewModel extends Order {
    _id?: string;
    isExpanded?: boolean;
}

interface ExpandStatus {
    id: string;
    isExpanded: boolean;
}