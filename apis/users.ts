import { mainAPI } from "@/lib/axios";

export type UserParam = {
  username?: string;
  email?: string;
  role?: string;
  status?: string;
};

const ENDPOINT = "/users";

export async function getAllUsers(options?: { signal?: AbortSignal }) {
  const response = await mainAPI.get<any>(ENDPOINT, {
    params: {},
    signal: options?.signal,
  });
  return response;
}

export async function getUsers(
  params: UserParam,
  options?: { signal?: AbortSignal },
) {
  const response = await mainAPI.get<any>(ENDPOINT, {
    params,
    signal: options?.signal,
  });

  return response;
}

export async function getUser(id: string, options?: { signal?: AbortSignal }) {
  const response = await mainAPI.get<any>(`${ENDPOINT}/${id}`, {
    params: {},
    signal: options?.signal,
  });

  return response;
}
