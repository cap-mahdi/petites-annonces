export interface User {
  id: string;
  name: string;
  email: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
