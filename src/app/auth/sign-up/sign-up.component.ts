import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
