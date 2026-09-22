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
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuthService {
  currentUser = signal<SuperAdminLoginData | null>(null);

  constructor(
    private http: HttpClient,
    private authstorageservice: AuthStorageService,
  ) {
    this.currentUser.set(this.authstorageservice.getUser());
  }

  login(request: SuperAdminLoginRequest): Observable<SuperAdminLoginResponse> {
    return this.http
      .post<SuperAdminLoginResponse>(
        API_ENDPOINTS.auth.superAdminLogin,
        request,
      )
      .pipe(
        tap((response) => {
          if (response.success && response.users) {
            this.authstorageservice.setToken(response.token || '');
            this.authstorageservice.setUser(response.users);
            this.currentUser.set(response.users);
          }
        }),
      );
  }

  logout() {
    this.authstorageservice.clear();
    this.currentUser.set(null);
  }
}
