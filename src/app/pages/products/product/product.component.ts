import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isJsonStringifiedObject } from '../../../utils';
import { ErrorComponent } from '../../../ui/error/error.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  productId?: string | null;
  product: any;
  productImages: any;

  error = false;

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
          this.error = true;
        },
      });
    }
  }

  onBackToProducts() {
    this.router.navigate(['/products']);
  }
}
