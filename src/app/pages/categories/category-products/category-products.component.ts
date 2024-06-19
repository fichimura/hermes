import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute } from '@angular/router';
import { ListComponent } from '../../../ui/list/list.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent implements OnInit {
  categoryId?: string | null;
  categoryProducts: any = [];

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (this.categoryId) {
      this.categoriesService.getProductsOfCategory(this.categoryId).subscribe({
        next: (response) => {
          this.categoryProducts = [...response];
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
