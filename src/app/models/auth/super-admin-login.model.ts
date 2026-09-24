import { ApiSingleResponse } from '../common/api-response.model';

export interface SuperAdminLoginRequest {
  email: string;
  password: string;
}

export interface SuperAdminUser {
  id: number;
  userTypeId: number;
  email: string;
  fullName: string;
  mobileNo: string;
}

export type SuperAdminLoginResponse = ApiSingleResponse<SuperAdminUser>;
