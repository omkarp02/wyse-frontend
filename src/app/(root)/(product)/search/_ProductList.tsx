"use client";

import { getProductList } from "@/services/product/list-product";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "../_component/ProductCard";
import { useSearchParams } from "next/navigation";
import { LIST_PRODUCT } from "@/constants/reactquery";

const ProductList = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LIST_PRODUCT, name], 
    queryFn: async () =>
      await getProductList({ page: 1, limit: 10, name }),
  });

  if (isLoading) return <h1> loading... </h1>;
  if (isError) return <div>Sorry There was an Error</div>;
  return (
    <div className="flex flex-wrap justify-between mt-5">
      {productList &&
        Array.isArray(productList.data) &&
        productList.data.map((ele, index) => (
          <ProductCard
            className="px-1 h-[46vh] w-[49.5%]"
            discount={ele.discount}
            imgLink={ele.imgLink}
            name={ele.name}
            productLink={`/products?id=${ele.productDetailId}&batch=${ele.batchId}`}
            price={ele.price}
            key={index}
          />
        ))}
    </div>
  );
};

export default ProductList;
