import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interface/product.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubjet = new BehaviorSubject<Product[]>([]);
  private totalSubjet = new BehaviorSubject<number>(0);
  private quantitySubjet = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubjet.asObservable();
  }
  get quatityAction$(): Observable<number> {
    return this.quantitySubjet.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubjet.asObservable();
  }

  updateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.price * prod.qty),
      0
    );
    this.totalSubjet.next(total);
  }

  private quantityProducts(): void {
    const quatity = this.products.reduce((acc, prod) => (acc += prod.qty), 0);
    this.quantitySubjet.next(quatity);
  }

  private addToCart(product: Product): void {
    const isProductInCart = this.products.find(({ id }) => id === product.id);
    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
    }
    this.cartSubjet.next(this.products);
  }

  resetCart(): void {
    this.cartSubjet.next([]);
    this.totalSubjet.next(0);
    this.quantitySubjet.next(0);
    this.products = [];
  }
}
