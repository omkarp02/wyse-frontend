
import CircleStepper from "@/components/stepper/circle-stepper";
import Stepper from "@/components/stepper/circle-stepper";
import { GET_CART_DETAILS } from "@/constants/reactquery";
import ShoppingBag from "@/features/order/component/ShoppingBag";
import getQueryClient from "@/lib/queryClient";
import { getCartApi } from "@/services/product/cart";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CheckCircle, CreditCard, Home } from "lucide-react";

const steps = [
  { label: "Bag", id: 1 },
  { label: "Address", id: 2 },
  { label: "Payment", id: 3 },
];

const CartPage = async () => {

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [GET_CART_DETAILS],
    queryFn: async () => {
      return await getCartApi();
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      {/* <section className="px-6 my-4">
        <CircleStepper steps={steps} curStep={currentStep} />
      </section> */}
      <div className="main-container">
        <HydrationBoundary state={dehydratedState}>
          <ShoppingBag />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default CartPage;
