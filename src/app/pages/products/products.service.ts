import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(offset: string): Observable<any> {
    return this.httpClient.get(
      `${this.PRODUCTS_URL}?offset=${offset}&limit=10`
    );
  }
}