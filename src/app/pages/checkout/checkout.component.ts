import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { DataService } from 'src/app/share/components/header/services/data.service';
import { ShoppingCartService } from 'src/app/share/components/header/services/shoppingCart.service';
import {
  Details,
  Order,
} from 'src/app/share/components/interface/order.interface';
import { Stores } from 'src/app/share/components/interface/store.interface';
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/servises/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAdress: '',
    city: '',
  };
  cart: Product[] = [];
  stores: Stores[] = [];
  isDelivery: boolean = true;

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService
  ) {
    this.checkIfCartIsEmty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepereDatils();
  }

  onPickUpOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay,
      isDelivery: this.isDelivery,
    };
    this.dataSvc
      .saveOrder(data)
      .pipe(
        tap((res) => console.log('Order->', res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepereDatils();
          return this.dataSvc.saveDetailOrder({ details, orderId });
        }),
        tap((res) => this.router.navigate(['/checkout/thank-you-page'])),
        delay(1000),
        tap(() => this.shoppingCartSvc.resetCart())
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataSvc
      .getStore()
      .pipe(tap((storesApi: Stores[]) => (this.stores = storesApi)))
      .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepereDatils(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const {
        id: productId,
        name: productName,
        qty: quantity,
        stock,
      } = product;
      const updateStock = stock - quantity;
      this.productsSvc
        .updateStock(productId, updateStock)
        .pipe(tap(() => details.push({ productId, productName, quantity })))
        .subscribe();
    });
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(tap((products: Product[]) => (this.cart = products)))
      .subscribe();
  }

  private checkIfCartIsEmty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe();
  }
}
