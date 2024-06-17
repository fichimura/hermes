import { Component } from '@angular/core';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  onSignIn(form: NgForm) {
    this.authService.signIn({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
