"use client";

import { getProductList } from "@/services/product/list-product";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../_component/ProductCard";
import { useSearchParams } from "next/navigation";
import { LIST_PRODUCT } from "@/constants/reactquery";
import { generateProductUrl } from "@/utils/helper";
import Loader from "@/components/loader/Loader";
import { LIMIT } from "@/constants/common";
import ProductFilter from "@/components/filter/Filter";
import { FILTER_TYPE } from "@/components/filter/AllFilter";

const ProductList = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const sizes = searchParams.get(FILTER_TYPE.SIZE)
  ? searchParams.get(FILTER_TYPE.SIZE)!.split(",")
  : [];
const colors = searchParams.get(FILTER_TYPE.COLOR)
  ? searchParams.get(FILTER_TYPE.COLOR)!.split(",")
  : [];
  const collection = searchParams.get("collection");
  const [hasMore, setHasMore] = useState(true);
  const ref = useRef(null);

  const {
    refetch,
    data: productData,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [LIST_PRODUCT, name, category, collection, sizes, colors],
    queryFn: async ({ pageParam }) => {
      const data = await getProductList({
        page: pageParam,
        limit: LIMIT,
        count: true,
        name,
        category,
        sizes,
        colors,
        collection,
      });
      console.log(data.data, "<<<<<<<<<<");
      return data?.data ?? [];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

  function handleFitlerSubmit(){
    refetch()
  }

  useEffect(() => {
    let oberver = null;
    if (ref.current) {
      oberver = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );
      oberver.observe(ref?.current);
    }
    return () => {
      if (oberver && ref.current) {
        oberver.disconnect();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (productData?.pages && productData.pages.length > 1) {
      if (productData.pages[productData.pages.length - 1].length === 0) {
        setHasMore(false);
      }
    }
  }, [productData]);

  if (isLoading) return <h1> loading... </h1>;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <>
      <div className="flex flex-wrap justify-between mt-5 relative">
        {productData?.pages.map((productList, i) => (
          <>
            {productList &&
              Array.isArray(productList) &&
              productList.map((ele, index) => (
                <ProductCard
                  className="px-1 h-[46vh] w-[49.5%]"
                  discount={ele.discount}
                  imgLink={ele.imgLink}
                  name={ele.name}
                  productLink={generateProductUrl(
                    ele.slug,
                    ele.batchId,
                    ele.code
                  )}
                  price={ele.price}
                  key={index}
                />
              ))}
          </>
        ))}
        {hasMore ? (
          <div ref={ref} className="flex flex-col  items-center w-full">
            <Loader />
          </div>
        ) : (
          ""
        )}
      </div>
      <ProductFilter handleSubmit={handleFitlerSubmit} />
    </>
  );
};

export default ProductList;
