import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TenantRequest,
  TenantSaveResponse,
} from '../../models/tenant-admin/tenant.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private http: HttpClient) {}

  saveTenant(request: TenantRequest): Observable<TenantSaveResponse> {
    const formData = new FormData();

    formData.append('Action', request.action);
    formData.append('Id', request.id?.toString() ?? '');
    formData.append('CompanyName', request.companyName);
    formData.append('CompanyEmail', request.companyEmail);
    formData.append('CompanyPhone', request.companyPhone);
    formData.append('CompanyAddress', request.companyAddress);

    formData.append('ContactPersonName', request.contactPersonName);

    formData.append('ContactPersonEmail', request.contactPersonEmail);

    formData.append('ContactPersonMobile', request.contactPersonMobile);

    if (request.registrationCertificate) {
      formData.append(
        'RegistrationCertificate',
        request.registrationCertificate,
        request.registrationCertificate.name,
      );
    }

    return this.http.post<TenantSaveResponse>(
      API_ENDPOINTS.tenant.saveTenant,
      formData,
    );
  }
}
