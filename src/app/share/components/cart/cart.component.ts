import { Component } from '@angular/core';
import { ShoppingCartService } from '../header/services/shoppingCart.service';

@Component({
  selector: 'app-cart',
  template: `
    <ng-container
      *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart"
    >
      <ng-container *ngIf="dataCart.total">
        <mat-icon>add_shopping_cart</mat-icon>
        {{ dataCart.total | currency }}
        ({{ dataCart.quantity }})
      </ng-container>
    </ng-container>
  `,
})
export class CartComponent {
  constructor(private shoopingCartSvc: ShoppingCartService) {}

  quantity$ = this.shoopingCartSvc.quatityAction$;
  total$ = this.shoopingCartSvc.totalAction$;
}
