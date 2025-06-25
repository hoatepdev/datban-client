import { ToastType } from "./toast";

export interface APIResponsePre<T> {
  code: number;
  data: T;
  message: string;
  status: string;
}

export interface APIResponsePost<T> {
  code: number;
  data: T;
  message: string | string[];
  type: ToastType;
  options?: RequestOptions;
}

export interface ServerErrorResponse {
  code: number;
  traceid: string;
  context: string;
  message: string | string[];
  status: number;
}

export interface PaginatedResponse<T> extends APIResponsePost<T> {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface RequestConfig
  extends Omit<Partial<import("axios").AxiosRequestConfig>, "headers"> {
  headers?: Record<string, string>;
  apiVersion?: number;
  prefix?: string;
}

export interface RequestOptions {
  signal?: AbortSignal;
  ignoreToast?: boolean;
}
