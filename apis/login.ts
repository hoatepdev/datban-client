import { mainAPI } from "@/lib/axios";
import { ILoginRequest, ILoginResponse } from "@/types/login";
import { clientMain } from ".";
import { RequestOptions } from "@/types/api";

export async function loginCredentials({
  body,
  options,
}: {
  body: ILoginRequest;
  options?: RequestOptions;
}) {
  const response = await clientMain.post<ILoginResponse, ILoginRequest>({
    endpoint: `/login`,
    body,
    options,
  });
  return response.data;
}

export async function loginGoogle(options?: { signal?: AbortSignal }) {
  const response = await mainAPI.get<any>(`/login/google`, {
    params: {},
    signal: options?.signal,
  });

  return response;
}
