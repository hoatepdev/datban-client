"use client";
import { loginCredentials, loginGoogle } from "@/apis/login";
import { APIResponsePost } from "@/types/api";
import { ILoginRequest, ILoginResponse } from "@/types/login";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ILoginCredentialsProps {
  mutationOptions?: UseMutationOptions<
    ILoginResponse | null,
    Error,
    ILoginRequest,
    unknown
  >;
}

interface ILoginGoogleProps {
  queryOptions?: UseQueryOptions<ILoginResponse | null, Error, unknown>;
  // queryFn?: () => Promise<AxiosResponse<ILoginResponse>>;
}
export function useLoginCredentials(props: ILoginCredentialsProps) {
  return useMutation({
    ...props.mutationOptions,
    mutationKey: ["loginCredentials"],
    mutationFn: (body: ILoginRequest) => {
      const response = loginCredentials({ body });

      return response;
    },
  });
}

export function useLoginGoogle(props: ILoginGoogleProps) {
  return useQuery({
    ...props.queryOptions,
    queryKey: ["loginGoogle"],
    queryFn: () => loginGoogle(),
  });
}
