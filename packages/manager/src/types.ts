export interface ResponseBody {
  msg?: string;
  status?: number;
  error: boolean;
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
