import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StandardButtonComponent } from '../../features/shared/components/standard-button/standard-button.component';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  imports: [RouterLink, StandardButtonComponent, CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  appName: string;
  public authService = inject(AuthService);
  private router = inject(Router);

  // router = inject(Router);
  @ViewChild('confirmLogoutModal') confirmModal!: ElementRef;

  constructor() {
    this.appName = environment.appName;
  }

  onLogout(): void {
    // Show Bootstrap modal instead of native confirm
    const modalElement = document.getElementById('confirmLogoutModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmLogout(): void {
    this.authService.logout();
    // Hide the modal
    const modalElement = document.getElementById('confirmLogoutModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.router.navigate(['/']);
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
