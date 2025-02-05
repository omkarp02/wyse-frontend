"use client";

import React from "react";
import CartItem from "./ui/CartItem";
import { useGetCart } from "@/hooks/query/cart";
import { ICartItem } from "@/types/api";

const ShoppingBag = () => {
  const { data: cartData } = useGetCart();

  return (
    <div>
      {cartData?.items.map((e: ICartItem, i: number) => (
        <CartItem {...e} key={i} />
      ))}
    </div>
  );
};

export default ShoppingBag;
