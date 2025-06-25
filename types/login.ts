export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    username: string;
    role: string;
    permissions: string[];
  };
}

export interface ILoginRequest {
  email: string;
  password: string;
}
