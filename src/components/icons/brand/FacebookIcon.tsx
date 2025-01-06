import { cn } from "@/lib/utils";
import { IconProps, iconVariants } from "@/types/props";
import Image from "next/image";
import React from "react";

const FacebookIcon = ({variant, size}: IconProps) => {
  return (
    <Image
      src={"/facebook-icon.svg"}
      className={cn(iconVariants({ variant, size }))}
      width={50}
      height={50}
      alt="facebook icon"
    />
  );
};

export default FacebookIcon;
