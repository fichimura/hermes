import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  images: any = [];

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
