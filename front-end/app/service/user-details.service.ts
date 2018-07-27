import { Injectable } from "@angular/core";
import { Address, Buyer } from "../../../shared/dtos";

const STORAGE_KEY = "userDetails";
@Injectable()
export class UserDetailsService {
  constructor() {
    this.load();
  }

  private _buyer: Buyer = {} as any;
  private _deliveryAddress: Address = {} as any;
  private _billingAddress: Address = {} as any;
  private _billingAddressSameAsDeliveryAddress = false;

  get billingAddressSameAsDeliveryAddress() {
    return this._billingAddressSameAsDeliveryAddress;
  }

  set billingAddressSameAsDeliveryAddress(value: boolean) {
    this._billingAddressSameAsDeliveryAddress = value;
    this.save();
  }

  get firstName() {
    return this._buyer.firstName;
  }

  set firstName(firstName: string) {
    this._buyer.firstName = firstName;
    this.save();
  }
  get lastName() {
    return this._buyer.lastName;
  }

  set lastName(lastName: string) {
    this._buyer.lastName = lastName;
    this.save();
  }
  get email() {
    return this._buyer.email;
  }

  set email(email: string) {
    this._buyer.email = email;
    this.save();
  }

  get phone() {
    return this._buyer.phone;
  }

  set phone(phone: string) {
    this._buyer.phone = phone;
    this.save();
  }

  get buyer() {
    return this._buyer;
  }

  get deliveryAddressLine1() {
    return this._deliveryAddress.line1;
  }

  set deliveryAddressLine1(line1: string) {
    this._deliveryAddress.line1 = line1;
    this.save();
  }

  get deliveryAddressLine2() {
    return this._deliveryAddress.line2;
  }

  set deliveryAddressLine2(line2: string) {
    this._deliveryAddress.line2 = line2;
    this.save();
  }

  get deliveryAddressTown() {
    return this._deliveryAddress.town;
  }

  set deliveryAddressTown(town: string) {
    this._deliveryAddress.town = town;
    this.save();
  }
  get deliveryAddressPostcode() {
    return this._deliveryAddress.postcode;
  }

  set deliveryAddressPostcode(postcode: string) {
    this._deliveryAddress.postcode = postcode;
    this.save();
  }
  get deliveryAddress() {
    return this._deliveryAddress;
  }

  get billingAddressLine1() {
    return this._billingAddress.line1;
  }

  set billingAddressLine1(line1: string) {
    this._billingAddress.line1 = line1;
    this.save();
  }
  get billingAddressLine2() {
    return this._billingAddress.line2;
  }

  set billingAddressLine2(line2: string) {
    this._billingAddress.line2 = line2;
    this.save();
  }

  get billingAddressTown() {
    return this._billingAddress.town;
  }

  set billingAddressTown(town: string) {
    this._billingAddress.town = town;
    this.save();
  }

  get billingAddressPostcode() {
    return this._billingAddress.postcode;
  }

  set billingAddressPostcode(postcode: string) {
    this._billingAddress.postcode = postcode;
    this.save();
  }

  get billingAddress() {
    return this._billingAddress;
  }

  private save() {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        buyer: this.buyer,
        deliveryAddress: this.deliveryAddress,
        billingAddress: this.billingAddress,
        billingAddressSameAsDeliveryAddress: this
          .billingAddressSameAsDeliveryAddress
      })
    );
  }

  private load() {
    let userDetails = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (userDetails === null) {
      userDetails = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    if (userDetails && userDetails.buyer) {
      this._buyer = userDetails.buyer;
    }
    if (userDetails && userDetails.deliveryAddress) {
      this._deliveryAddress = userDetails.deliveryAddress;
    }

    if (userDetails && userDetails.billingAddress) {
      this._billingAddress = userDetails.billingAddress;
    }
    if (userDetails && userDetails.billingAddressSameAsDeliveryAddress) {
      this._billingAddressSameAsDeliveryAddress =
        userDetails.billingAddressSameAsDeliveryAddress;
    }
  }

  public saveUserDetailsInLocalStorage() {
    localStorage.setItem(STORAGE_KEY, sessionStorage.getItem(STORAGE_KEY));
  }
}
