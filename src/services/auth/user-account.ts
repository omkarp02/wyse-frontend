import axiosInstance from "@/lib/axios/globalInstance";

export const loginApi = async (cred: any) => {
  const data = await axiosInstance.post(`/auth/login`, cred);
  return data;
};
