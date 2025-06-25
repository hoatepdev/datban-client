import { APIError, APISuccess } from "@/config/axios/response-handler";
import {
  APIResponsePost,
  APIResponsePre,
  RequestOptions,
  ServerErrorResponse,
} from "@/types/api";
import { AxiosError, AxiosResponse } from "axios";
import { ToastKeys } from "@/constants/toast";
import { HTTP_STATUS } from "@/constants/axios";

export function handleApiSuccess<T>(
  response: APIResponsePre<T>,
  options?: RequestOptions,
): APIResponsePost<T> {
  return new APISuccess<T>({
    code: response.code || HTTP_STATUS.OK,
    data: response.data,
    type: ToastKeys.SUCCESS,
    message: response.message,
    options,
  });
}

export function handleApiError(
  error: AxiosError<ServerErrorResponse>,
): APIResponsePost<null> {
  const { code, message } = error.response?.data || {};
  return new APIError({ code, message, type: ToastKeys.ERROR });
}

export async function safeApiCall<T>(
  apiCall: Promise<AxiosResponse<APIResponsePre<T>>>,
  options?: RequestOptions,
): Promise<APIResponsePost<T | null>> {
  try {
    const response = await apiCall;
    return handleApiSuccess<T>(response.data, options);
  } catch (error) {
    return handleApiError(error as AxiosError<ServerErrorResponse>);
  }
}
