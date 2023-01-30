import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/share/components/header/services/shoppingCart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from './servises/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(
    private productsSvc: ProductsService,
    private shooppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.productsSvc
      .getProducts()
      .pipe(tap((products: Product[]) => (this.products = products)))
      .subscribe();
  }
  addToCart(product: Product): void {
    this.shooppingCartSvc.updateCart(product);
  }
}
