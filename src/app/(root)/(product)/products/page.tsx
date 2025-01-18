import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GET_PRODUCT } from "@/lib/constants";
import getQueryClient from "@/lib/queryClient";
import { getProductDetails } from "@/services/product/product-detail";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import ProductDetail from "./_ProductDetail";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const param = await searchParams;
  const id = param["id"] || null;

  const queryClient = getQueryClient();

  if (id === null) return <></>

  await queryClient.prefetchQuery({
    queryKey: [GET_PRODUCT, id],
    queryFn: async () => {
      console.log("server side api called")
      return await getProductDetails(id);
    },
    retry: false,
  });
  const dehydratedState = dehydrate(queryClient);

  console.log("here is something happeningd here")

  return  <div className="main-container">
  <HydrationBoundary state={dehydratedState}>
    <ProductDetail  />
  </HydrationBoundary>
  <div className="h-10"></div>
</div>
};

export default ProductPage;
