import { cn } from "@/utils/helper";
import React from "react";

const Divider = ({ text, className }: { text?: string, className?: string }) => {
  return (
    <div className={cn("relative h-5", className)}>
      <div className="border-b border-black absolute-center w-full"></div>
      {text && (
        <div className="bg-background w-8 inline-block absolute-center text-center">
          {text}
        </div>
      )}
    </div>
  );
};

export default Divider;
