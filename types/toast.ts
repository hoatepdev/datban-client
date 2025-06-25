export interface Toast {
  title: string;
  description: string;
  type: ToastType;
}

export type ToastTypeKeys = {
  SUCCESS: "success";
  ERROR: "error";
  INFO: "info";
  WARNING: "warning";
};

export type ToastType = ToastTypeKeys[keyof ToastTypeKeys];
