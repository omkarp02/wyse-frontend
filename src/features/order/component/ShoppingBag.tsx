"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./ui/CartItem";
import { useGetCart } from "@/hooks/query/cart";
import { ICartItem } from "@/types/api";
import { useBoundStore } from "@/store/store";

const ShoppingBag = () => {
  let { data: cartData, refetch } = useGetCart();
  const cartItems = useBoundStore((state) => state.cartItems);
  const token = useBoundStore((state) => state.token);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [cartItems]);

  return (
    <div>
      {cartData?.items?.map((e: ICartItem, i: number) => (
        <section className="my-2 mx-1" key={i}>
          <CartItem refetch={refetch} {...e}  />
        </section>
      ))}
    </div>
  );
};

export default ShoppingBag;
