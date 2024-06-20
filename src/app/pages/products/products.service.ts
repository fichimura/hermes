import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(offset: number, filters: any = {}): Observable<any> {
    let url = `${this.PRODUCTS_URL}?offset=${offset}&limit=10`;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        url += `&${key}=${filters[key]}`;
      }
    });

    return this.httpClient.get(url);
  }

  getProduct(productId: string): Observable<any> {
    return this.httpClient.get(`${this.PRODUCTS_URL}/${productId}`);
  }
}
