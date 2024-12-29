import { calculateDiscountedPrice, cn } from "@/lib/utils";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import React from "react";

type TProductCard = {
  imgLink: string;
  name: string;
  price: number;
  discount: number;
  className: string;
};

const ProductCard = ({
  imgLink,
  name,
  price,
  discount,
  className,
}: TProductCard) => {
  return (
    <div className={cn("h-1/2 w-[49.5%] relative my-4", className)}>
      <div className="h-full w-full">
        <Image alt="asdf" src={imgLink} width={500} height={500} className="w-full h-full" />
      </div>
      <div className="mt-2">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis  ">{name}</p>
        <div className="flex gap-2 ">
          <p className="">
          ₹{price - calculateDiscountedPrice(price, discount)}
          </p>
          <p className="line-through ">
          ₹{price}
          </p>
          <p className="text-success">
            50% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
