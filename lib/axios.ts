import { createAxiosInstance } from "@/config/axios/instance-factory";
import { HTTP_METHODS } from "@/constants/axios";
import { RequestConfig } from "@/types/api";
import { AxiosResponse } from "axios";

export class APIClient {
  private instance: ReturnType<typeof createAxiosInstance>;
  private prefix: string;
  private version: number;

  constructor(
    service: "main" | "auth" | "media" = "main",
    prefix = "/api",
    version = 1,
  ) {
    this.instance = createAxiosInstance(service);
    this.prefix = prefix;
    this.version = version;
  }

  private async request<T>(
    method: (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS],
    endpoint: string,
    config: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.request<T>({
        method,
        url: endpoint,
        prefix: this.prefix,
        apiVersion: this.version,
        ...config,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public get<T>(
    endpoint: string,
    config: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(HTTP_METHODS.GET, endpoint, config);
  }

  public post<T, R>(
    endpoint: string,
    data?: R,
    config?: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(HTTP_METHODS.POST, endpoint, { ...config, data });
  }

  public put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(HTTP_METHODS.PUT, endpoint, { ...config, data });
  }

  public delete<T>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(HTTP_METHODS.DELETE, endpoint, { ...config });
  }

  public patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(HTTP_METHODS.PATCH, endpoint, { ...config, data });
  }
}

export const mainAPI = new APIClient("main", "/api", 1);

export const authAPI = new APIClient("auth", "/api", 1);

export const mediaAPI = new APIClient("media", "/api", 1);
