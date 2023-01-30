import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detailsOrders, Order } from '../../interface/order.interface';
import { Stores } from '../../interface/store.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getStore(): Observable<Stores[]> {
    return this.http.get<Stores[]>(`${this.apiURL}/stores`);
  }
  saveOrder(order: Order): Observable<any> {
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }

  saveDetailOrder(details: detailsOrders): Observable<detailsOrders> {
    return this.http.post<detailsOrders>(
      `${this.apiURL}/detailsOrders`,
      details
    );
  }
}
