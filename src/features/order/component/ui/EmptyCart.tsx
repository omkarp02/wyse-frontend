import EmptyCartIcon from "@/components/icons/EmptyCaryt";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] ">
      <EmptyCartIcon className="w-1/2 max-w-[300px]"  />

      <p className="text-2xl font-semibold my-2">Hey, it feels so light!</p>
      <p className="text-sm text-muted">
        There is nothing in your bag. Let&apos;s add some items
      </p>
    </div>
  );
};

export default EmptyCart;
