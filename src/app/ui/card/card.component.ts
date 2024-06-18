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

  constructor(private router: Router) {}

  onCardClicked() {
    console.log('card clicked', this.subject().id);
    this.router.navigate(['/products', this.subject().id]);
  }
}
