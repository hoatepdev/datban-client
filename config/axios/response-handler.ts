import { APIResponsePost, RequestOptions } from "@/types/api";
import { HTTP_STATUS } from "@/constants/axios";
import { ToastType } from "@/types/toast";
import { ToastKeys } from "@/constants/toast";
import { toast } from "sonner";
import { renderMessageToastTsx } from "@/utils/renderTsx";

export class APIError {
  public readonly code: number;
  public readonly message: string | string[];
  public readonly data: null;
  public readonly type: ToastType;
  public readonly options?: RequestOptions;
  constructor({
    code = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = "Internal Server Error",
    type = ToastKeys.ERROR,
    data = null,
    options,
  }: Partial<APIResponsePost<null>>) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.type = type;
    this.options = options;

    if (this.type && !this.options?.ignoreToast) {
      toast.error(this.message, {
        description: renderMessageToastTsx(this.message),
      });
    }

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, APIError.prototype);
  }

  public toJSON(): APIResponsePost<null> {
    return {
      code: this.code,
      data: null,
      message: this.message,
      type: this.type,
    };
  }
}

export class APISuccess<T> {
  public readonly code: number;
  public readonly data: T;
  public readonly message: string | string[];
  public readonly type: ToastType;
  public readonly options?: RequestOptions;
  constructor({
    code = HTTP_STATUS.OK,
    data = {} as T,
    message = "Success",
    type = ToastKeys.SUCCESS,
    options,
  }: Partial<APIResponsePost<T>>) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.type = type;
    this.options = options;

    if (this.type && !this.options?.ignoreToast) {
      toast.success(this.message, {
        description: renderMessageToastTsx(this.message),
      });
    }

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, APISuccess.prototype);
  }

  public toJSON(): APIResponsePost<T> {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      type: this.type,
    };
  }
}
