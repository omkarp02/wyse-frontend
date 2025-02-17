import { GENDER } from "@/constants/api";
import axiosInstance from "@/lib/axios/protectedInstance";

export type IUpdateUserProfileApi = {
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  gender: GENDER;
};

export const updateUserProfileApi = async (payload: IUpdateUserProfileApi) => {
  const data = await axiosInstance.post(`/user/profile`, payload);
  return data;
};

export const getUserProfileApi = async () => {
  const data = await axiosInstance.get(`/user/profile`);
  return data;
};

