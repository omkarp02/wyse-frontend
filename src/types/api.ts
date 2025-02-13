import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

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
  slug: string;
  batchId: string;
  code: string;
};

export type IVariation = {
  size: string;
  price: number;
  discount: number;
  stock: number;
};

export type IBatchProductDetail = {
  imgLink: string;
  productCode: string;
  slug: string;
};

export type ICartItemProduct = {
  id: string;
  name: string;
  previewImg: string;
  variations: IVariation;
};

export type ICartItem = {
  cartId: string;
  productCode: string;
  size: string;
  quantity: number;
  product: ICartItemProduct;
};
