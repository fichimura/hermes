import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { ListComponent } from '../../../ui/list/list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
  getCategoryProductsSubscription?: Subscription;

  categoryId?: string | null;
  categoryProducts: any = [];

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (this.categoryId) {
      this.getCategoryProductsSubscription = this.categoriesService
        .getProductsOfCategory(this.categoryId)
        .subscribe({
          next: (response) => {
            this.categoryProducts = [...response];
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.getCategoryProductsSubscription) {
      this.getCategoryProductsSubscription.unsubscribe();
    }
  }
}
