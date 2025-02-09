import axiosInstance from "@/lib/axios/protectedInstance";

type IAddress = {
  address: string;
  name: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  mobileNo: string;
  alternateMobileNo?: string;
};

export type IAddUserAddressApi = {
  address: IAddress;
  isPrimary: boolean;
  type: string;
};

export type IEditUserAddressApi = {
  id: string;
  address: IAddress;
  isPrimary: boolean;
  type: string;
};

export type IResGetAddressApi = {
  id: string;
  address: IAddress;
  isPrimary: boolean;
  type: string;
};

export type IDeleteAddressByUserIdsApi = {
  ids: string[];
};

export const addUserAddressApi = async (payload: IAddUserAddressApi) => {
  const data = await axiosInstance.post(`/address`, payload);
  return data;
};

export const editUserAddressApi = async (payload: IEditUserAddressApi) => {
  const data = await axiosInstance.put(`/address`, payload);
  return data;
};

export const getUserAddressListApi = async () => {
  const data = await axiosInstance.get(`/address`);
  return data;
};

export const getUserAddressApi = async (id: string) => {
  const data = await axiosInstance.get(`/address/${id}`);
  return data;
};

export const getUserPrimaryAddressApi = async () => {
  const data = await axiosInstance.get(`/address/is-primary`);
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

export const deleteAddressByUserIdsApi = async (
  payload: IDeleteAddressByUserIdsApi
) => {
  const data = await axiosInstance.post(`/address/delete/many`, payload);
  return data;
};

export type IToggleAddressIsPrimaryApi = {
  id: string;
  isPrimary: boolean;
};

export const toggleAddressIsPrimary = async (
  payload: IToggleAddressIsPrimaryApi
) => {
  const data = await axiosInstance.patch(`/address/is-primary`, payload);
  return data;
};
