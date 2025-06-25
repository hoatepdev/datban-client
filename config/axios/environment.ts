import { API_URL } from "../env";

interface EnvironmentConfig {
  main: string;
  auth?: string;
  media?: string;
  timeout: number;
  withCredentials: boolean;
}

const environments: EnvironmentConfig = {
  main: API_URL ?? "http://localhost:4000",
  // auth: import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:3001',
  // media: import.meta.env.VITE_MEDIA_API_URL ?? 'http://localhost:3002',
  timeout: 30000,
  withCredentials: true,
};

// export const getCurrentEnvironment = (): EnvironmentConfig => {
//     const env = (import.meta.env.VITE_APP_ENV ?? 'development') as keyof Environments;
//     return environments[env];
//   };

export default environments;
