import globalInstance from "@/lib/axios/globalInstance";
import axiosInstance from "@/lib/axios/protectedInstance";
import { getRefreshToken } from "@/utils/helper";

export const loginApi = async (cred: { userId: string; password: string }) => {
  const data = await globalInstance.post(`/auth/login`, cred);
  return data;
};

export const registerApi = async (cred: {
  userId: string;
  password: string;
}) => {
  const refreshToken = getRefreshToken()
  const data = await globalInstance.post(`/auth/register`, cred, {headers: {"refresh_token": refreshToken}});
  return data;
};

export const handleRefreshTokenApi = async () => {
  const refreshToken = getRefreshToken()
  const data = await globalInstance.get(`/auth/handle-refresh-token`, {headers: {"refresh_token": refreshToken}});
  return data;
};


export const logoutApi = async () => {
  const refreshToken = getRefreshToken()
  const data = await axiosInstance.get(`/auth/user/logout`, {headers: {"refresh_token": refreshToken}});
  return data;
};
