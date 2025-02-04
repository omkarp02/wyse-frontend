import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
} from "@/components/ui/drawer";
import { cn } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import ProductSize from "./ProductSize";
import { IVariation } from "@/types/api";
import { useAddToCart } from "@/hooks/mutation/cart";
import { ICartItem } from "@/services/product/cart";

const AddtoCart = ({
  size,
  handleSizeChange,
  variations,
  setScreenLoader,
  item,
}: {
  size: string | null;
  handleSizeChange(field: string, val: string): void;
  setScreenLoader?: (val: boolean) => void;
  variations: IVariation[];
  item?: ICartItem | null;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const mutation = useAddToCart();

  function handleOpenDrawer(open: boolean, size: string | null) {
    if (size === null) {
      setOpenDrawer(open);
    }
  }

  function addToCart() {
    if (size && item) {
      const payload = { item: [item] };
      mutation.mutate(payload);
    }
  }

  //   useEffect(() => {
  //     setScreenLoader(mutation.isPending);
  //   }, [mutation.isPending]);

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={(open) => {
        handleOpenDrawer(open, size);
      }}
    >
      <DrawerTrigger asChild>
        <section className="sticky top-[95%] mt-4 px-1">
          <AddToCartButton handleOnClick={addToCart} />
        </section>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Select Size</DrawerTitle>
          </DrawerHeader>
          <ProductSize
            className="mt-4"
            handleChange={handleSizeChange}
            size={size}
            variations={variations}
          />
          <AddToCartButton
            handleOnClick={addToCart}
            disabled={!!!size}
            className="my-6"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const AddToCartButton = ({
  className,
  disabled,
  handleOnClick,
}: {
  className?: string;
  disabled?: boolean;
  handleOnClick?: () => void;
}) => {
  return (
    <Button
      size={"lg"}
      onClick={handleOnClick}
      disabled={disabled}
      className={cn("w-full", className)}
    >
      Add to Cart
    </Button>
  );
};

export default AddtoCart;
