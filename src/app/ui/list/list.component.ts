import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ProductsService } from '../../pages/products/products.service';
import { CategoriesService } from '../../pages/categories/categories.service';

import { CardComponent } from '../card/card.component';
import { LoadingComponent } from '../loading/loading.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ErrorComponent } from '../error/error.component';

import { type SearchParams } from '../search-bar/searchParams.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    CommonModule,
    CardComponent,
    LoadingComponent,
    SearchBarComponent,
    ErrorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  getProductsSubscription?: Subscription;
  getCategoriesSubscription?: Subscription;
  getProductsOfCategorySubscription?: Subscription;

  context = input.required<string>();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  categoryId = input<string | null | undefined>();

  subjects: any = [];
  loading = false;
  currentOffset = 0;
  searchFilters?: SearchParams;

  error = false;

  ngOnInit(): void {
    if (
      this.context() === 'Products' ||
      this.context() === 'Categories' ||
      this.context() === 'CategoryProducts'
    ) {
      this.loadSubjects();
    } else {
      throw new Error(
        'There is no correspondent object to display in the listing'
      );
    }
  }

  loadSubjects(): void {
    this.loading = true;
    if (this.context() === 'Products') {
      this.getProducts();
    } else if (this.context() === 'Categories') {
      this.getCategories();
    } else if (this.context() === 'CategoryProducts') {
      this.getCategoryProducts(this.categoryId());
    }
  }

  getProducts(): void {
    this.getProductsSubscription = this.productsService
      .getProducts(this.currentOffset, this.searchFilters)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.subjects = [...this.subjects, ...response];
        },
        error: (error) => {
          this.loading = false;
          this.error = true;
        },
      });
  }

  getCategories(): void {
    this.getCategoriesSubscription = this.categoriesService
      .getCategories()
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.subjects = [...this.subjects, ...response];
        },
        error: (error) => {
          this.loading = false;
          this.error = true;
        },
      });
  }

  getCategoryProducts(categoryId: string | null | undefined): void {
    this.getProductsOfCategorySubscription = this.categoriesService
      .getProductsOfCategory(categoryId)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.subjects = [...this.subjects, ...response];
        },
        error: (error) => {
          this.loading = false;
          this.error = true;
        },
      });
  }

  onScroll(): void {
    this.currentOffset = this.currentOffset + 10;
    if (this.context() === 'Products') {
      this.getProducts();
    }
  }

  onSearch(searchParams: SearchParams): void {
    this.searchFilters = searchParams;
    this.loading = true;
    this.subjects = [];
    this.currentOffset = 0;
    this.getProducts();
  }

  onResetSearch(): void {
    this.currentOffset = 0;
    this.searchFilters = {
      title: undefined,
      categoryId: undefined,
      price_min: undefined,
      price_max: undefined,
    };

    this.getProducts();
  }

  onBackToCategories(): void {
    this.router.navigate(['/categories']);
  }

  ngOnDestroy(): void {
    if (this.getProductsSubscription) {
      this.getProductsSubscription.unsubscribe();
    }
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.getProductsOfCategorySubscription) {
      this.getProductsOfCategorySubscription.unsubscribe();
    }
  }
}
