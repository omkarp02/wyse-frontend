"use client";

import PriceDisplay from "@/components/display/PriceDisplay";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BASE_SIZE } from "@/constants/api";
import {
  GET_CART_DETAILS,
  GET_CART_DETAILS_OFFLINE,
} from "@/constants/reactquery";
import { useUpdateCartItem } from "@/hooks/mutation/cart";
import { useGetProductVariations } from "@/hooks/query/product";
import { useBoundStore } from "@/store/store";
import { ICartItem as ICartItemApi, IVariation } from "@/types/api";
import { cn } from "@/utils/helper";
import { Label } from "@radix-ui/react-label";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { Car, Check, ChevronDown, Undo2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Option = {
  label: string;
  value: any;
  disabled: boolean;
  price?: number;
  discount?: number;
};
const SIZE_ID = "size";
const QTY_ID = "qty";

let fetched = false;

type ICartItem = ICartItemApi & {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

const CartItem = ({
  cartId,
  productCode,
  size,
  product,
  quantity,
}: ICartItem) => {
  const [openDrawer, setOpenDrawer] = useState({
    [SIZE_ID]: false,
    [QTY_ID]: false,
  });
  const token = useBoundStore((state) => state.token);
  const updateCart = useBoundStore((state) => state.updateCart);
  const queryClient = useQueryClient();

  const mutation = useUpdateCartItem();

  const { data: variationData, refetch } = useGetProductVariations(
    productCode,
    false
  );

  let sizeList: Option[] = [];
  const qtyList: Option[] = [];
  for (let i = 1; i <= 10; i++) {
    qtyList.push({
      label: i.toString(),
      value: i,
      disabled: i > product.variations.stock,
    });
  }

  if (variationData) {
    sizeList = variationData.map((e: IVariation) => ({
      label: e.size,
      value: e.size,
      disabled: e.stock === 0,
      price: e.price,
      discount: e.discount,
    }));
  }

  function handleDropdownClick(id: string) {
    if (!fetched) {
      refetch();
      fetched = true;
    }
    handleOpenDrawer(id, true);
  }

  function handleOpenDrawer(name: string, val: boolean) {
    setOpenDrawer((prev) => ({ ...prev, [name]: val }));
  }

  function handleSizeSubmit(val: string) {
    if (!token) {
      updateCart(productCode, undefined, val);
    } else {
      mutation.mutate({ cartId, size: val });
    }

    handleOpenDrawer(SIZE_ID, false);
  }

  function handleQtySubmit(val: number) {
    if (!token) {
      updateCart(productCode, val);
    } else {
      mutation.mutate({ cartId, quantity: val });
    }
    handleOpenDrawer(QTY_ID, false);
  }

  return (
    <>
      <section className="flex h-[10rem] relative">
        <div className="h-full">
          <Image
            className="h-full w-auto"
            src={product.previewImg}
            width={200}
            height={300}
            alt="img"
          />
        </div>
        <div className="ms-2 flex flex-col gap-2">
          <p className="text-base">{product.name}</p>
          <div className="flex gap-2">
            <CartDropdown
              id={SIZE_ID}
              handleOnClick={handleDropdownClick}
              name="size"
              value={size}
            />
            <CartDropdown
              id={QTY_ID}
              handleOnClick={handleDropdownClick}
              name="qty"
              value={quantity?.toString()}
            />
          </div>
          <PriceDisplay
            className="text-sm"
            price={product.variations.price * quantity}
            discount={product.variations.discount}
          />
          <div className="flex items-center">
            <div className="rounded-full border me-2 h-5 w-5 flex items-center justify-center border-black">
              <Undo2 size={12} />
            </div>{" "}
            <span className="font-medium">14 {`days `} </span> &nbsp;{" "}
            <span className="text-sm">return available</span>
          </div>
          <div className="flex items-center">
            <Check color="#00B573" size={20} className="me-2" />{" "}
            <span>Delivery by</span>&nbsp;{" "}
            <span className="font-medium">8 Feb 2025</span>
          </div>
        </div>
        <X size={20} className="absolute right-0" />
      </section>
      <CartDrawer
        items={sizeList}
        value={size}
        handleSubmit={handleSizeSubmit}
        open={openDrawer.size}
        onOpenChange={(val) => {
          handleOpenDrawer("size", val);
        }}
        title={"Select Size"}
      />

      <CartDrawer
        items={qtyList}
        value={quantity}
        handleSubmit={handleQtySubmit}
        open={openDrawer.qty}
        onOpenChange={(val) => {
          handleOpenDrawer("qty", val);
        }}
        title={"Select Quantity"}
      />
    </>
  );
};

const CartDropdown = ({
  name,
  value,
  id,
  handleOnClick,
}: {
  name: string;
  value: string;
  id: string;
  handleOnClick: (id: string) => void;
}) => {
  return (
    <div
      key={id}
      role="button"
      onClick={() => handleOnClick(id)}
      className="bg-secondary text-sm flex w-fit px-2 items-center rounded-sm font-medium"
    >
      <span className="capitalize me-1">{name}:</span>
      <span className="text-sm">{value}</span>
      <ChevronDown size={12} />
    </div>
  );
};

const CartDrawer = ({
  title,
  items,
  open,
  onOpenChange,
  value,
  handleSubmit,
}: {
  title: string;
  items: Option[];
  open: boolean;
  onOpenChange: (val: boolean) => void;
  value: any;
  handleSubmit: (val: any) => void;
}) => {
  const [curVal, setCurVal] = useState(value);

  const index = items.findIndex((e) => e.value === curVal);
  const curVariation = items[index];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <section className="flex gap-3 flex-wrap my-4">
            {items.map((e, i) => {
              if (e.value === BASE_SIZE) return "";
              return (
                <button
                  onClick={() => setCurVal(e.value)}
                  disabled={e.disabled}
                  className={cn(
                    "bg-transparent flex items-center justify-center border border-black rounded-full px-2 py-2 min-w-10 relative",
                    curVal === e.value &&
                      "border-primary bg-primary text-primary-foreground",
                    e.disabled && "border-muted bg-background text-muted"
                  )}
                >
                  {e.label}
                  {e.disabled ? (
                    <div className="absolute w-[0.5px] h-full bg-muted top-0 j rotate-45"></div>
                  ) : (
                    ""
                  )}
                </button>
              );
            })}
          </section>
          {curVariation?.discount && curVariation?.price && (
            <PriceDisplay
              className="mx-2"
              discount={curVariation.discount}
              price={curVariation.price}
            />
          )}

          <Button
            onClick={() => handleSubmit(curVal)}
            className="w-full uppercase my-4"
          >
            Done
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartItem;
