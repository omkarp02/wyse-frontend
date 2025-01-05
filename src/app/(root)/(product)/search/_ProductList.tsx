"use client"

import { getProductList } from "@/services/product/list-product";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "../_component/ProductCard";

const ProductList = () => {
  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"], //Array according to Documentation
    queryFn: async () => await getProductList(1, 10),
  });

  if (isLoading) return <h1> LoADING </h1>;
  if (isError) return <div>Sorry There was an Error</div>;
  return (
    <div className="flex flex-wrap justify-between mt-5">
      {productList &&
        Array.isArray(productList.data) &&
        productList.data.map((ele, index) => (
          <ProductCard
            className=""
            discount={ele.discount}
            imgLink={ele.imgLink}
            name={ele.name}
            price={ele.price}
            key={index}
          />
        ))}
    </div>
  );
};

export default ProductList;
