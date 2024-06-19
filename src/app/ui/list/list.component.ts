import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardComponent } from '../card/card.component';
import { ProductsService } from '../../pages/products/products.service';
import { CategoriesService } from '../../pages/categories/categories.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  context = input.required<string>();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  subjects: any = [];
  loading = false;
  currentOffset = 0;

  ngOnInit(): void {
    if (this.context() === 'Products') {
      this.loadProducts();
    } else if (this.context() === 'Categories') {
      this.loadCategories();
    } else {
      throw new Error(
        'There is no correspondent object to display in the listing'
      );
    }
  }

  getProducts() {
    this.productsService.getProducts(this.currentOffset.toString()).subscribe({
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
    this.categoriesService.getCategories().subscribe({
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

  loadProducts(): void {
    this.loading = true;
    this.getProducts();
  }

  loadCategories(): void {
    this.loading = true;
    this.getCategories();
  }

  onScroll(): void {
    this.currentOffset = this.currentOffset + 10;
    if (this.context() === 'Products') {
      this.getProducts();
    }
  }
}
