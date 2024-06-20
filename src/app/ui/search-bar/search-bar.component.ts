import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../pages/categories/categories.service';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { type SearchParams } from './searchParams.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, NgxSliderModule, BsDropdownModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  categories: any;

  @Input() searchProductTitle?: string;
  @Input() searchCategoryFilter?: string;
  @Input() searchPriceMinimumFilter?: string;
  @Input() searchPriceMaximumFilter?: string;
  search = output<SearchParams>();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...response];
      },
      error: (error) => console.error(error),
    });
  }

  onSearchChange(searchParams: SearchParams): void {
    console.log(searchParams);
    this.search.emit(searchParams);
  }
}
