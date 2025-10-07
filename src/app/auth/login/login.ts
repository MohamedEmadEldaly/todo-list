import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnDestroy {
  loginError = signal(false);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  _unsubscribeAll = new Subject();
  constructor(private auth: AuthService) {}

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      const success = this.auth
        .login({
          username: this.form.value['username'] || undefined,
          password: this.form.value['password'] || undefined,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/todos']);
          },
          error: (error) => {
            this.loginError.set(error?.message);
          },
        });
      this.loginError.set(!success);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }
}
