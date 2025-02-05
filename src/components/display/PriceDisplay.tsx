import { cn, getActualPrice } from "@/utils/helper";
import React from "react";

const PriceDisplay = ({
  price,
  discount,
  className,
}: {
  price: number;
  discount: number;
  className: string;
}) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <p className="">₹{price}</p>
      <p className="line-through ">₹{getActualPrice(price, discount)}</p>
      <p className="text-success">{discount}% off</p>
    </div>
  );
};

export default PriceDisplay;
