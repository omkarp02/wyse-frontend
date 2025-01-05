import axiosInstance from "@/lib/axios/globalInstance";

export const loginApi = async (cred: { email: string; password: string }) => {
  const data = await axiosInstance.post(`/auth/login`, cred);
  return data;
};
