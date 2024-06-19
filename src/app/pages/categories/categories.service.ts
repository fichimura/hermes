import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORIES_URL =
    'https://api.escuelajs.co/api/v1/categories';

  constructor(private httpClient: HttpClient) {}

  getCategories(offset: number): Observable<any> {
    return this.httpClient.get(
      `${this.CATEGORIES_URL}/?offset=${offset}&limit=10`
    );
  }

  getProductsOfCategory(
    categoryId: string | null | undefined
  ): Observable<any> {
    return this.httpClient.get(`${this.CATEGORIES_URL}/${categoryId}/products`);
  }
}
