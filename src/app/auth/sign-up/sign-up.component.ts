import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

import { SubmitCancelComponent } from '../../ui/submit-cancel/submit-cancel.component';
import { ErrorComponent } from '../../ui/error/error.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, SubmitCancelComponent, ErrorComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnDestroy {
  signUpSubscription?: Subscription;

  error = false;
  errorMessage: string =
    'Error when signing up. Check the values and try again.';

  constructor(private authService: AuthService) {}

  onSignUp(form: NgForm): void {
    this.signUpSubscription = this.authService
      .signUp({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        avatar: form.value.avatar,
      })
      .subscribe({
        error: (error) => {
          this.error = true;
          this.errorMessage = error.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
