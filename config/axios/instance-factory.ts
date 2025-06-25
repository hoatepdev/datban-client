import axios, { AxiosInstance } from "axios";
// import { getCurrentEnvironment } from './environment';
import { requestInterceptor, responseInterceptor } from "./interceptors";
import { CONTENT_TYPE } from "../../constants/axios";
import { RequestConfig } from "@/types/api";
import environments from "./environment";

type ServiceType = "main" | "auth" | "media";

export const createAxiosInstance = (
  service: ServiceType = "main",
  customConfig?: RequestConfig,
): AxiosInstance => {
  //   const env = getCurrentEnvironment();

  const { headers = {}, ...config } = customConfig || {};

  const instance = axios.create({
    baseURL: environments[service],
    timeout: environments.timeout,
    withCredentials: environments.withCredentials,
    headers: {
      "Content-Type": CONTENT_TYPE.JSON,
      Accept: CONTENT_TYPE.JSON,
      "Access-Control-Allow-Origin": "*", // Add CORS header
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", // Add allowed methods
      ...headers,
    },
    ...config,
  });

  instance.interceptors.request.use(
    requestInterceptor.onFulfilled,
    requestInterceptor.onRejected,
  );

  instance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected,
  );

  return instance;
};
