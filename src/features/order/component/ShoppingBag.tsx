"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./ui/CartItem";
import { useGetCart } from "@/hooks/query/cart";
import { ICartItem } from "@/types/api";
import { useBoundStore } from "@/store/store";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { GET_CART_DETAILS_OFFLINE } from "@/constants/reactquery";
import _ from "lodash";

const ShoppingBag = () => {
  let { data: cartData, refetch } = useGetCart();
  const cartItems = useBoundStore((state) => state.cartItems);
  const token = useBoundStore((state) => state.token);
  const queryClient = useQueryClient();

  const getOfflineCartData: any = () =>
    queryClient.getQueryData([GET_CART_DETAILS_OFFLINE]);


  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [cartItems]);

  function asdf(productCode: string) {
    queryClient.setQueryData([GET_CART_DETAILS_OFFLINE], (curElem: any) => {
      console.log(curElem,'<<<<<<<<<<<<<< curle')
      const index = curElem?.items?.findIndex(
        (e: ICartItem) => e.productCode === productCode
      );
      if (index != -1) {
        curElem?.items?.splice(index, 1);
      }

      return _.cloneDeep(curElem);
    });
  }


  return (
    <div>
      {getOfflineCartData()?.items?.map((e: ICartItem, i: number) => (
        <section className="my-2 mx-1" key={i}>
          <CartItem refetch={refetch} {...e} />
          <button onClick={()=> asdf(e.productCode)}>asldkf</button>
        </section>
      ))}
    </div>
  );
};

export default ShoppingBag;
