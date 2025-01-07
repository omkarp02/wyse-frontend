import internal from "stream";

export type ICategory = {
  catId: string;
  name: string;
  icon: string;
  slug: string;
};

export type IProductList = {
  id: string;
  name: string;
  discount: number;
  price: number;
  imgLink: string;
};
