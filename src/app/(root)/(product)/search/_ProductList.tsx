"use client";

import { getProductList } from "@/services/product/list-product";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "../_component/ProductCard";
import { useSearchParams } from "next/navigation";
import { LIST_PRODUCT } from "@/constants/reactquery";
import { generateProductUrl } from "@/utils/helper";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import Loader from "@/components/loader/Loader";

const ProductList = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  const {
    data: productList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LIST_PRODUCT, name],
    queryFn: async () => await getProductList({ page: 1, limit: 10, name }),
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
            productLink={generateProductUrl(ele.slug, ele.batchId, ele.code)}
            price={ele.price}
            key={index}
          />
        ))}
      {/* <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore && <Loader />}
      </InfiniteScroll> */}
    </div>
  );
};

export default ProductList;
