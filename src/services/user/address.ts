import axiosInstance from "@/lib/axios/protectedInstance";

export type IAddUserAddressApi = {
  address: {
    address: string;
    name: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    mobileNo: string;
    alternateMobileNo?: string;
  };
  isPrimary: boolean;
  type: string;
};

export const addUserAddressApi = async (payload: IAddUserAddressApi) => {
  const data = await axiosInstance.post(`/address`, payload);
  return data;
};

export const getUserAddressApi = async () => {
  const data = await axiosInstance.get(`/address`);
  return data;
};

export const updateUserAddressApi = async () => {
  const data = await axiosInstance.get(`/address`);
  return data;
};

export const deleteAddressApi = async (id: string) => {
  const data = await axiosInstance.delete(`/address/${id}`);
  return data;
};
