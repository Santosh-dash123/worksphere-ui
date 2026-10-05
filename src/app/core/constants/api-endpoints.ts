import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  baseUrl: environment.apiUrl,

  auth: {
    superAdminLogin: `${environment.apiUrl}/Auth/SuperAdminLogin`,
  },

  tenant: {
    saveTenant: `${environment.apiUrl}/SuperAdmin/SaveTenant`,
    getTenant: `${environment.apiUrl}/SuperAdmin/GetTenant`,
  },
};
