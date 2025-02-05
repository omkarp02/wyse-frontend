import { ERROR_STATUS } from "./errors";

export function getMutationErrorMsg(
  error: any,
  field?: string
): {
  msg: string;
  status: number;
} {
  let msg = "Something Went Wrong!";

  const finalError = error?.response?.data;
  const status = finalError?.status ?? 1;
  if (finalError) {
    if (status === ERROR_STATUS.INVALID_CRED) {
      msg = "Invalid Credentails";
    } else if (status === ERROR_STATUS.ALREADY_EXIST) {
      msg = `${field} already exists`;
    }
  }
  return { msg, status };
}
