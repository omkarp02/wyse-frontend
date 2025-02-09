import { cn } from "@/utils/helper";
import { IconProps, iconVariants } from "@/types/props";
import Image from "next/image";
import React from "react";

const ComingSoon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={"/comingsoon.jpg"}
      className={className}
      width={211}
      height={211}
      alt="facebook icon"
    />
  );
};

export default ComingSoon;
