import { HttpClient } from '@angular/common/http';
import {
  SuperAdminLoginData,
  SuperAdminLoginRequest,
  SuperAdminLoginResponse,
  SuperAdminUser,
} from '../../../models/auth/super-admin-login.model';
import { API_ENDPOINTS } from '../../constants/api-endpoints';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuthService {
  currentUser = signal<SuperAdminLoginData | null>(
    JSON.parse(localStorage.getItem('worksphere_user') || 'null'),
  );
  constructor(private http: HttpClient) {}

  login(request: SuperAdminLoginRequest): Observable<SuperAdminLoginResponse> {
    return this.http
      .post<SuperAdminLoginResponse>(
        API_ENDPOINTS.auth.superAdminLogin,
        request,
      )
      .pipe(
        tap((response) => {
          if (response.success && response.users) {
            localStorage.setItem('worksphere_token', response.token || '');
            localStorage.setItem(
              'worksphere_user',
              JSON.stringify(response.users),
            );

            this.currentUser.set(response.users);
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem('worksphere_token');
    localStorage.removeItem('worksphere_user');
    this.currentUser.set(null);
  }
}
