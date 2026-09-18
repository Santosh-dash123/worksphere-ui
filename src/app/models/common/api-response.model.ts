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
