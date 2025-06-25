import { APIClient, authAPI, mainAPI, mediaAPI } from "@/lib/axios";
import { safeApiCall } from "@/utils/api";
import { RequestConfig, RequestOptions } from "@/types/api";

export class client {
  constructor(private readonly api: APIClient = mainAPI) {}

  public post = <T, R>({
    endpoint,
    body,
    config,
    options,
  }: {
    endpoint: string;
    body: R;
    config?: RequestConfig;
    options?: RequestOptions;
  }) => {
    return safeApiCall<T>(this.api.post(endpoint, body, config), options);
  };
}

export const clientMain = new client();

export const clientAuth = new client(authAPI);

export const clientMedia = new client(mediaAPI);
