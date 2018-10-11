export interface WithToast {
  toastError: (m: string) => void;
  toastSuccess: (m: string) => void;
  toastWarning: (m: string) => void;
  toastInfo: (m: string) => void;
  toastLoading: (m: string) => void;
}
