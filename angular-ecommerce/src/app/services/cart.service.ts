import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    // check if we have already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      // find the item in the cart based on its id
      existingCartItem = this.cartItems.find(
        (item) => item.id === theCartItem.id
      );
      // check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }
    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const index = this.cartItems.findIndex(
      (item) => item.id === theCartItem.id
    );
    // if found, remove the item from the array at the given index
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new value ... all subscribers will receive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("contents of the cart");
    for (let theCartItem of this.cartItems) {
      const subTotalPrice = theCartItem.quantity * theCartItem.unitPrice;
      console.log(
        `name: ${theCartItem.name}, quantity: ${theCartItem.quantity},
        unitPrice:${theCartItem.unitPrice}, subTotal:${subTotalPrice}`
      );
    }
    console.log(
      `totalPrice:${totalPriceValue.toFixed(
        2
      )}, totalQuantity:${totalQuantityValue}`
    );
    console.log("-------");
  }
}
