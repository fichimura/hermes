import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  subject = input.required<any>();
  context = input.required<string>();

  constructor(private router: Router) {}

  onProductCardClicked(): void {
    this.router.navigate(['/products', this.subject().id]);
  }

  onCategoryCardClicked(): void {
    this.router.navigate(['/categories', this.subject().id]);
  }
}
