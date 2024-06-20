import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isJsonStringifiedObject } from '../../../utils';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  productId?: string | null;
  product: any;
  productImages: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    if (this.productId) {
      this.productsService.getProduct(this.productId?.toString()).subscribe({
        next: (response) => {
          this.product = response;
          if (isJsonStringifiedObject(response.images)) {
            this.productImages = JSON.parse(response.images);
          } else {
            this.productImages = response.images;
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onBackToProducts() {
    this.router.navigate(['/products']);
  }
}
