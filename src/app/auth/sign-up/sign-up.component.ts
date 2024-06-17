import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  onSignUp(form: NgForm) {
    this.authService.signUp({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      avatar: form.value.avatar,
    });
  }
}
