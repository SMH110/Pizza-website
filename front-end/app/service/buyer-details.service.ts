import { Injectable } from '@angular/core';

@Injectable()
export class BuyerDetailsService {
    firstName = '';
    lastName = '';
    selectedDeliveryMethod : any = 'Delivery';
    addressLine1 = '';
    addressLine2 = '';
    postcode = '';
    email = '';
    phone = '';
    note = '';

    deliveryMethods = [
        'Delivery', 'Collection'
    ];

    clearAddress() {
        this.addressLine1 = null;
        this.addressLine2 = null;
        this.postcode = null;
    }
}