import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardComponent } from '../card/card.component';
import { ProductsService } from '../../pages/products/products.service';
import { CategoriesService } from '../../pages/categories/categories.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchParams } from '../search-bar/searchParams.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    CommonModule,
    CardComponent,
    LoadingComponent,
    SearchBarComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
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

  getProducts() {
    this.productsService
      .getProducts(this.currentOffset, this.searchFilters)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.subjects = [...this.subjects, ...response];
        },
        error: (error) => {
          this.loading = false;

          console.error(error);
        },
      });
  }

  getCategories() {
    this.categoriesService.getCategories(this.currentOffset).subscribe({
      next: (response) => {
        this.loading = false;
        this.subjects = [...this.subjects, ...response];
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }

  getCategoryProducts(categoryId: string | null | undefined) {
    this.categoriesService.getProductsOfCategory(categoryId).subscribe({
      next: (response) => {
        this.loading = false;
        this.subjects = [...this.subjects, ...response];
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }

  onScroll(): void {
    this.currentOffset = this.currentOffset + 10;
    if (this.context() === 'Products') {
      this.getProducts();
    }
  }

  onSearch(searchParams: SearchParams) {
    this.searchFilters = searchParams;
    this.loading = true;
    this.subjects = [];
    this.currentOffset = 0;
    this.getProducts();
  }

  onResetSearch() {
    this.currentOffset = 0;
    this.searchFilters = {
      title: undefined,
      categoryId: undefined,
      price_min: undefined,
      price_max: undefined,
    };

    this.getProducts();
  }

  onBackToCategories() {
    this.router.navigate(['/categories']);
  }
}
