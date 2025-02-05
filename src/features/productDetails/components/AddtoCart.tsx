import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
} from "@/components/ui/drawer";
import { cn, generateRandomNumber } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import ProductSize from "./ProductSize";
import { IVariation } from "@/types/api";
import { useAddToCart } from "@/hooks/mutation/cart";
import { IAddCartApiCartItem } from "@/services/product/cart";
import { useBoundStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS } from "@/utils/errors/errors";

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
  item?: IAddCartApiCartItem | null;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const token = useBoundStore((state) => state.token);
  const addToCartFn = useBoundStore((state) => state.addToCart);
  const { toast } = useToast();

  const mutation = useAddToCart();

  function handleOpenDrawer(open: boolean, size: string | null) {
    if (size === null) {
      setOpenDrawer(open);
    } else if (!open) {
      setOpenDrawer(false);
    }
  }

  function addToCart() {
    if (size && item) {
      if (token) {
        const payload = { item: [item] };
        mutation.mutate(payload);
      } else {
        const cartItem = {
          cartId: `C-${generateRandomNumber(5)}`,
          productCode: item.productCode,
          size: item.size,
          quantity: item.quantity,
        };
        const res = addToCartFn(cartItem);
        if(res === -1){
          toast({
            title: "Added to Bag",
            variant: "default",
          });
        }else if(res === ERROR_STATUS.ALREADY_EXIST){
          toast({
            title: "Item already exist in the cart",
            variant: "destructive",
          });
        }
       
      }
    }
  }

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
