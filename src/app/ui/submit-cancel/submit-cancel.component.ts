import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-cancel',
  standalone: true,
  imports: [],
  templateUrl: './submit-cancel.component.html',
  styleUrl: './submit-cancel.component.scss',
})
export class SubmitCancelComponent {
  submitText = input.required<string>();

  constructor(private router: Router) {}

  onCancel() {
    this.router.navigate(['/']);
  }
}
