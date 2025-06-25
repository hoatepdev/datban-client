import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
// import { refreshAccessToken } from '@/services/auth';
import { HTTP_STATUS } from "@/constants/axios";
import { APIResponsePost, RequestConfig } from "@/types/api";
import { getServerCookie, getServerJSONCookie } from "@/utils/server-cookies";
import { getClientCookie } from "@/utils/client-cookies";

export const requestInterceptor = {
  onFulfilled: (
    config: InternalAxiosRequestConfig & RequestConfig,
  ): InternalAxiosRequestConfig => {
    const accessToken = getClientCookie("accessToken");
    console.log("⭐ accessToken1", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.url = `${config.prefix || ""}${config.apiVersion ? `/v${config.apiVersion}` : ""}${config.url}`;
    delete config.prefix;
    delete config.apiVersion;

    config.headers["X-Request-ID"] = crypto.randomUUID();
    config.headers["X-Request-ID"] = crypto.randomUUID();

    return config;
  },
  onRejected: (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
};

export const responseInterceptor = {
  onFulfilled: <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
  },
  onRejected: async (
    error: AxiosError<APIResponsePost<null>>,
  ): Promise<never> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // const newToken = await refreshAccessToken();
        const newToken = "";

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return await axios(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  },
};
