import globalInstance from "@/lib/axios/globalInstance";
import axiosInstance from "@/lib/axios/protectedInstance";

export const loginApi = async (cred: { email: string; password: string }) => {
  const data = await globalInstance.post(`/auth/login`, cred);
  return data;
};

export const registerApi = async (cred: {
  email: string;
  password: string;
}) => {
  const data = await globalInstance.post(`/auth/register`, cred);
  return data;
};

export const handleRefreshTokenApi = async () => {
  const data = await globalInstance.get(`/auth/handle-refresh-token`);
  return data;
};


export const logoutApi = async () => {
  const data = await axiosInstance.get(`/auth/user/logout`);
  return data;
};
