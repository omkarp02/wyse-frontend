import { IVariation } from "@/types/api";
import { cn } from "@/utils/helper";
import React from "react";

type IProductSize = {
  variations: IVariation[];
  handleChange(field: string, val: string): void;
  size: string | null;
  className?: string;
};

const ProductSize = ({
  variations,
  handleChange,
  size,
  className,
}: IProductSize) => {
  return (
    <section className={cn("px-2 ", className)}>
      <p>Select Size</p>
      <div className="flex flex-wrap  gap-5 mt-3">
        {variations.map((ele, index) => {
          if (ele.size === "base_size") return "";
          return (
            <div
            key={index}
              role="button"
              onClick={() => handleChange("size", ele.size)}
              className={cn(
                "px-4 py-1 border border-black",
                size === ele.size && "bg-primary text-primary-foreground"
              )}
            >
              {ele.size}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSize;
