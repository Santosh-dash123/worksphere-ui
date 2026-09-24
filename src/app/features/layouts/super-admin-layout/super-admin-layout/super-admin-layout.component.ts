import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SuperAdminAuthService } from '../../../../core/services/Auth/superadminauth.service';
@Component({
  selector: 'app-super-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.css',
})
export class SuperAdminLayoutComponent {
  constructor(
    private router: Router,
    public superadminauthservice: SuperAdminAuthService,
  ) {}

  getUserInitialsChar(): string {
    const name = this.superadminauthservice.currentUser()?.fullName;

    if (!name) {
      return 'SA';
    }

    return name
      .trim()
      .split(' ')
      .filter((x) => x.length > 0)
      .map((x) => x.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  logout(): void {
    this.superadminauthservice.logout();
    this.router.navigateByUrl('/superadminlogin');
  }
}
