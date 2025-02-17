"use client"

import ShoppingBag from "@/features/order/component/ShoppingBag";
import { useBoundStore } from "@/store/store";

const CartPage = async () => {
  const hydrated = useBoundStore((state) => state.hydrated);

  return (
    <>
      <div className="main-container">{hydrated ? <ShoppingBag /> : null}</div>
    </>
  );
};

export default CartPage;
