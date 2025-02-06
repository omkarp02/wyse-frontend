import { getDiscountOnPrice } from "@/utils/helper";
import React from "react";

const PriceDetails = ({
  discountOnMrp,
  totalItem,
  totalPrice,
  className,
}: {
  totalItem: number;
  totalPrice: number;
  discountOnMrp: number;
  className?: string;
}) => {
  const priceDetails = [
    {
      label: "Total MRP",
      value: <span>₹{totalPrice.toLocaleString()}</span>,
    },
    {
      label: "Discount on MRP",
      value: (
        <span className="text-success">
          - ₹{discountOnMrp.toLocaleString()}
        </span>
      ),
    },
    {
      label: "Platform Fee",
      value: "₹50",
    },
    {
      label: "Shipping Fee",
      value: <span className="text-success uppercase">Free</span>,
    },
  ];

  return (
    <section className={className}>
      <p className="font-semibold my-2">
        <span className="uppercase">Price details</span>&nbsp; ({totalItem}{" "}
        items)
      </p>
      <hr />

      <table className="w-full">
        {priceDetails.map((e, i) => (
          <tr className={"w-2/3"}>
            <td className={"h-8 flex items-center"}>{e.label}</td>
            <td className="text-end">{e.value}</td>
          </tr>
        ))}
        <tr className={"w-2/3 h-10 border-t-[0.1px] border-secondary"}>
          <td className={"h-10"}>Total Amount</td>
          <td className="text-end font-semibold">
            ₹{totalPrice.toLocaleString()}
          </td>
        </tr>
      </table>
    </section>
  );
};

export default PriceDetails;
