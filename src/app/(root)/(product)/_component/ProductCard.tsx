import PriceDisplay from "@/components/display/PriceDisplay";
import { cn, getActualPrice } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProductCard = {
  imgLink: string;
  name: string;
  price: number;
  discount: number;
  className: string;
  productLink: string
};

const ProductCard = ({
  imgLink,
  name,
  price,
  discount,
  productLink,
  className,
}: TProductCard) => {
  return (
    <Link href={productLink} className={cn("relative my-4", className)}>
      <div className="h-5/6 w-full">
        <Image
          alt="asdf"
          src={imgLink}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-2">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis  ">
          {name}
        </p>
        <PriceDisplay price={price} discount={discount} className="text-sm" />
      </div>
    </Link>
  );
};

export default ProductCard;
