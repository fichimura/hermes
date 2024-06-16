import { Component } from '@angular/core';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {}
