import { cn } from "@/utils/helper";
import { IconProps, iconVariants } from "@/types/props";
import Image from "next/image";
import React from "react";

const EmptyCartIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={"/emptycart.png"}
      className={className}
      width={50}
      height={50}
      alt="facebook icon"
    />
  );
};

export default EmptyCartIcon;
