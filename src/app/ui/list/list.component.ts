import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardComponent } from '../card/card.component';
import { ProductsService } from '../../pages/products/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  context = input.required<string>();

  constructor(private productsService: ProductsService) {}

  subjects: any = [];
  loading = false;
  currentOffset = 0;

  ngOnInit(): void {
    if (this.context() === 'Products') {
      this.loadProducts();
    } else if (this.context() === 'Categories') {
      //TODO - CATEGORY PART
    } else {
      throw new Error(
        'There is no correspondent object to display in the listing'
      );
    }
  }

  getProducts() {
    this.productsService.getProducts(this.currentOffset.toString()).subscribe({
      next: (response) => {
        this.subjects = [...this.subjects, ...response];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.getProducts();
  }

  onScroll(): void {
    this.currentOffset = this.currentOffset + 10;
    this.loadProducts();
  }
}
