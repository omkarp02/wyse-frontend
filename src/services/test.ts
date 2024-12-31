import axiosInstance from "@/lib/axios/globalInstance";

type TProductList = {
  link: string,
  name: string,
  price: number,
  discount: number
}


export const getData = async () => {
  return await axiosInstance.get("/product_list");
};
