"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./ui/CartItem";
import { useGetCart } from "@/hooks/query/cart";
import { ICartItem } from "@/types/api";
import { useBoundStore } from "@/store/store";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { GET_CART_DETAILS_OFFLINE } from "@/constants/reactquery";
import _ from "lodash";
import { useDeleteCartItem, useUpdateCartItem } from "@/hooks/mutation/cart";
import { IUpdateCartItemApi } from "@/services/product/cart";
import PriceDetails from "./ui/PriceDetails";
import { getDiscountOnPrice } from "@/utils/helper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmptyCart from "./ui/EmptyCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginDialog from "./ui/LoginDialog";

const ShoppingBag = () => {
  let { data: cartData, refetch } = useGetCart();
  const cartItems = useBoundStore((state) => state.cartItems);
  const token = useBoundStore((state) => state.token);
  const router = useRouter();
  const deleteCart = useBoundStore((state) => state.deleteCartItem);
  const updateCartState = useBoundStore((state) => state.updateCart);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const deleteCartMutation = useDeleteCartItem();
  const updateCartMutation = useUpdateCartItem();

  function deleteCartItem(cartId: string) {
    if (token) {
      deleteCartMutation.mutate(cartId);
    } else {
      deleteCart(cartId);
    }
  }

  function handlePlaceOrder() {
    if (token) {
      router.push("/address");
    } else {
      setOpenLoginDialog(true);
    }
  }

  function updateCartItem(
    cartId: string,
    size?: string,
    qty?: number,
    prevQty?: number
  ) {
    const payload: IUpdateCartItemApi = { cartId: cartId, size, quantity: qty };
    if (token) {
      updateCartMutation.mutate({ payload: payload, prevQty });
    } else {
      updateCartState(payload);
    }
  }

  useEffect(() => {
    if (!token) {
      refetch();
    }
  }, [cartItems]);

  let totalPrice = 0;
  let totalItem = 0;
  let totalDiscountOnMrp = 0;
  if (cartData?.items?.length !== 0 && Array.isArray(cartData?.items)) {
    for (let item of cartData?.items) {
      totalPrice += item.product.variations.price * item.quantity;
      totalItem += item.quantity;
      totalDiscountOnMrp += getDiscountOnPrice(
        item.product.variations.price,
        item.product.variations.discount
      );
    }
  }

  return (
    <>
      <div className="relative flex justify-center">
        {cartData?.items && cartData?.items?.length > 0 ? (
          <div className="block sm:flex justify-center sm:gap-4 md:gap-6">
            <section className="sm:mt-14 max-h-[500px] hide-scrollbar overflow-y-auto" >
              {cartData?.items?.map((e: ICartItem, i: number) => {
                if (e.product) {
                  return (
                    <section className="my-2 mx-1" key={i}>
                      <CartItem
                        {...e}
                        updateCartItem={updateCartItem}
                        deleteCartItem={deleteCartItem}
                        product={e.product}
                      />
                      {/* <button onClick={()=> asdf(e.productCode)}>asldkf</button> */}
                    </section>
                  );
                } else {
                  return "";
                }
              })}
            </section>
            <section >
              <Button
                onClick={handlePlaceOrder}
                className="w-full uppercase sticky top-[94vh]"
                size={"lg"}
              >
                Place Order
              </Button>
              <PriceDetails
                className="my-6 px-2"
                discountOnMrp={totalDiscountOnMrp}
                totalItem={totalItem}
                totalPrice={totalPrice}
              />
              <Image
                src={
                  "https://nobero.com/cdn/shop/files/Frame_48097704.svg?v=1733223350"
                }
                alt="feature img"
                className="w-full my-6"
                width={330}
                height={400}
              />
              <div className="h-10"></div>
            </section>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      <LoginDialog
        open={openLoginDialog}
        onOpenChange={(val) => {
          setOpenLoginDialog(val);
        }}
      />
    </>
  );
};

export default ShoppingBag;
