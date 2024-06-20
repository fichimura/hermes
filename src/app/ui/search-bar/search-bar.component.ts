import { Component, Input, OnDestroy, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CategoriesService } from '../../pages/categories/categories.service';

import { type SearchParams } from './searchParams.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  getCategoriesSubscription?: Subscription;

  categories: any;

  error = false;

  @Input() searchProductTitle?: string;
  @Input() searchCategoryFilter?: string;
  @Input() searchPriceMinimumFilter?: string;
  @Input() searchPriceMaximumFilter?: string;
  search = output<SearchParams>();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.getCategoriesSubscription = this.categoriesService
      .getCategories()
      .subscribe({
        next: (response) => {
          this.categories = [...response];
        },
        error: (error) => (this.error = true),
      });
  }

  onSearchChange(searchParams: SearchParams): void {
    this.search.emit(searchParams);
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
  }
}
