export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T[] | null;
}
export interface ApiSingleResponse<T> {
  success: boolean;
  message: string | null;
  data: T | null;
}
export interface TenantFormModel {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  address: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  registrationCertificate: File | null;
}

export interface TenantRequest {
  action: string;
  id: number | null;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  registrationCertificate: File | null;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonMobile: string;
}

export interface TenantGetModel {
  id: number;
  tenantCode: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  registrationCertificate: string | null;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonMobile: string;
  isActive: boolean;
  createdBy: number | null;
  createdDate: string;
  modifiedBy: number | null;
  modifiedDate: string | null;
}

export interface TenantSaveResponse {
  success: boolean;
  message: string | null;
  data: TenantGetModel | null;
}
