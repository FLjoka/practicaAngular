import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/share/components/header/services/shoppingCart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  total$ = this.shoppingCartServiceSvc.totalAction$;
  cart$ = this.shoppingCartServiceSvc.cartAction$;

  constructor(private shoppingCartServiceSvc: ShoppingCartService) {}

  ngOnInit(): void {}
}
