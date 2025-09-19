import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StandardButtonComponent } from '../../../shared/components/standard-button/standard-button.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, StandardButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {

        if (res.success) {

          if(this.loginForm.value.rememberMe) {
            this.authService.saveToken(res.data.token);
            this.authService.saveUser(res.data.user);
          }

          this.router.navigate(['/']);
        } else {

          this.errorMessage = res.message;
        }

      }, er => {}, () => this.isLoading = false);


    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field.errors['email']) {
        return 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (field.errors['minlength']) {
        return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      }
    }
    return '';
  }
}
