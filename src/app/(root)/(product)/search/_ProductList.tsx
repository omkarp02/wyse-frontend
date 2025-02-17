"use client";

import { getProductList } from "@/services/product/list-product";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../_component/ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import { LIST_PRODUCT } from "@/constants/reactquery";
import { createSearchParamsUrl, generateProductUrl } from "@/utils/helper";
import Loader from "@/components/loader/Loader";
import { LIMIT, showOnDesktopClass } from "@/constants/common";
import { FILTER_TYPE } from "@/components/filter/AllFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { sortList } from "@/features/filter/data";

const ProductList = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const sizes = searchParams.get(FILTER_TYPE.SIZE)
    ? searchParams.get(FILTER_TYPE.SIZE)!.split(",")
    : [];
  const colors = searchParams.get(FILTER_TYPE.COLOR)
    ? searchParams.get(FILTER_TYPE.COLOR)!.split(",")
    : [];
  const collection = searchParams.get("collection");
  const gender = searchParams.get("gender");
  const sort_by = searchParams.get("sort_by");
  const [hasMore, setHasMore] = useState(true);
  const ref = useRef(null);

  const {
    refetch,
    data: productData,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      LIST_PRODUCT,
      name,
      category,
      collection,
      sizes,
      colors,
      gender,
      sort_by,
    ],
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
        gender,
        sort_by,
      });
      console.log(data.data, "<<<<<<<<<<");
      return data?.data ?? [];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

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

  function handleSortChange(val: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort_by", val);
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
  }

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
      <div className="flex justify-between items-center">
        <p className="heading ">Search Result for: {name ?? "All"}</p>
        <Select
          value={sort_by ?? sortList[0].value}
          onValueChange={handleSortChange}
          defaultValue={sortList[0].value}
        >
          <SelectTrigger className={`w-[180px] md:flex hidden`}>
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectGroup >
              <SelectLabel>Sort By: </SelectLabel>
              {sortList.map((e, i) => {
                return (
                  <SelectItem key={`sortby-${i}`} className="cursor-pointer" value={e.value}>
                    {e.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap justify-center mt-5 relative">
        {productData?.pages.map((productList, i) => (
          <>
            {productList &&
              Array.isArray(productList) &&
              productList.map((ele, index) => (
                <ProductCard
                  className="px-1 w-1/2 max-w-[250px] h-auto inline-block"
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
    </>
  );
};

export default ProductList;
