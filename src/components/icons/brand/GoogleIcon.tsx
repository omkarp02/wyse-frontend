import { cn } from "@/utils/helper";
import { IconProps, iconVariants } from "@/types/props";
import Image from "next/image";
import React from "react";

const GoogleIcon = ({variant, size}: IconProps) => {
  return (
    <Image
      src={"/google-icon.svg"}
      className={cn(iconVariants({ variant, size }))}
      width={50}
      height={50}
      alt="google icon"
    />
  );
};

export default GoogleIcon;
