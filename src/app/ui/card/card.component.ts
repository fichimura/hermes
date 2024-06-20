import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { isJsonStringifiedObject } from '../../utils';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  subject = input.required<any>();
  context = input.required<string>();
  imageUrl?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      this.context() === 'Products' ||
      this.context() === 'CategoryProducts'
    ) {
      if (isJsonStringifiedObject(this.subject().images)) {
        this.imageUrl = JSON.parse(this.subject().images)[0];
      } else {
        this.imageUrl = this.subject().images[0];
      }
    }
  }

  onProductCardClicked(): void {
    this.router.navigate(['/products', this.subject().id]);
  }

  onCategoryCardClicked(): void {
    this.router.navigate(['/categories', this.subject().id]);
  }
}
