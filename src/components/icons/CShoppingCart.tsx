import { ShoppingCart } from "lucide-react";
import React from "react";

type ICShoppingCart = {
    itemCount: number
}

const CShoppingCart = ({itemCount}: ICShoppingCart) => {
  return (
    <div className="relative">
      <ShoppingCart  />
      <div className="bg-primary px-1 absolute -top-1 -right-1 text-xs cursor-pointer rounded-full text-primary-foreground">{itemCount}</div>
    </div>
  );
};

export default CShoppingCart;
