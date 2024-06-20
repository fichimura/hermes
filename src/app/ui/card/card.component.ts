import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      this.imageUrl = JSON.parse(this.subject().images)[0];
    }
  }

  onProductCardClicked(): void {
    this.router.navigate(['/products', this.subject().id]);
  }

  onCategoryCardClicked(): void {
    this.router.navigate(['/categories', this.subject().id]);
  }
}
