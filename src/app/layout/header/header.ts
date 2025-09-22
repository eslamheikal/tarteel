import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StandardButtonComponent } from '../../features/shared/components/standard-button/standard-button.component';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ConfirmService } from '../../features/shared/services/confirm.service';

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
  private confirmService = inject(ConfirmService);

  constructor() {
    this.appName = environment.appName;
  }

  onLogout(): void {
    // Show Bootstrap modal instead of native confirm
    this.confirmService.confirm({
      message: 'هل أنت متأكد من الخروج؟',
      title: 'تأكيد الخروج',
      confirmText: 'نعم',
      cancelText: 'لا, إلغاء',
      confirmButtonClass: 'btn-danger',
      cancelButtonClass: 'btn-secondary'
    }).then((result: boolean) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
