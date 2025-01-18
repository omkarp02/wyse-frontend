"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GET_PRODUCT } from "@/lib/constants";
import { cn, getActualPrice, getDiscountOnPrice } from "@/lib/utils";
import { getProductDetails } from "@/services/product/product-detail";
import { IBatchProductDetail, IVariation } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const imageLink = [
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0011.webp?v=1734158131",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0006.webp?v=1734158131",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0007.webp?v=1734158131&width=360",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0010.webp?v=1734158131&width=360",
];

const ProductDetail = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  if (id === null) return <></>;

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [GET_PRODUCT, id],
    queryFn: async () => {
      console.log("client api got called heresd");
      return await getProductDetails(id);
    },
    retry: false,
  });

  if (isLoading) return <h1> LoADING </h1>;
  if (isError) return <div>Sorry There was an Error</div>;

  const productInfo = productDetail?.data?.product_details;
  const productBatch = productDetail?.data?.product_batch;
  const imgLinks = productInfo.imgLink;
  const variations: IVariation[] = productInfo.variations;
  let variation = variations[0];
  console.log(productInfo);
  console.log(productBatch);
  console.log("asdf");

  const price = variation.price;
  const discount = variation.discount;

  return (
    <section>
      <Carousel className="relative mt-4">
        <CarouselContent>
          {imgLinks.map((e: string, i: number) => (
            <CarouselItem key={i} className="relative basis-11/12 px-1">
              <Image
                alt="asdf"
                src={e}
                width={500}
                height={500}
                style={{ height: "auto", width: "100%" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="px-2 py-3 flex flex-col gap-1">
        <p>{productInfo.name}</p>
        <div className="flex gap-2 text-lg">
          <p className="font-semibold">₹{price}</p>
          <p className="font-semibold text-success">
            ₹{getDiscountOnPrice(price, discount)} OFF
          </p>
        </div>
        <div>
          <p className="flex gap-2 items-center">
            <span>MRP:</span>{" "}
            <span className="line-through">
              ₹{getActualPrice(price, discount)}
            </span>{" "}
            <span className="text-xs">Inclusive of all Taxes</span>{" "}
          </p>
        </div>
      </section>
      <section className="mt-4 px-2">
        <p className="">Select Color</p>
        <Carousel className="relative mt-2 he">
          <CarouselContent>
            {productBatch?.batchProductDetails?.map(
              (e: IBatchProductDetail, i: number) => (
                <CarouselItem key={i} className="relative basis-1/4 px-1">
                  <Link href={`/products?id=${e.productDetailId}`}>
                    <Image
                      className={cn(
                        e.productDetailId === id && "border border-black"
                      )}
                      alt="asdf"
                      src={e.imgLink}
                      width={76}
                      height={115}
                      style={{ height: "auto", width: "100%" }}
                    />
                    <div className="bg-background absolute-center rounded-full p-1">
                      <Check size={16} />
                    </div>
                  </Link>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="mt-4 px-2">
        <p>Select Size</p>
        <div className="flex gap-4 mt-3">
          {variations.map((ele, index) => {
            if (index === 0) return "";
            return <div className="px-4 py-1 border border-black">{ele.size}</div>;
          })}
        </div>
      </section>
    </section>
  );
};

export default ProductDetail;
