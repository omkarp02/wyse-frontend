"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type IInput = React.ComponentProps<"input"> & {
  errMsg?: string;
};

const Input: React.FC<IInput> = ({ className, type, errMsg, ...props }) => {
  const [showText, setShowText] = React.useState(false);

  function handlePasswordShow() {
    setShowText((prev) => !prev);
  }

  return (
    <div className="relative">
      <input
        type={!showText ? type : "text"}
        className={cn(
          " h-10 w-full rounded-md border  bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          errMsg ? "border-destructive" : "border-input"
        )}
        {...props}
      />
      {errMsg && <p className="text-destructive text-xs">{errMsg}</p>}
      {type === "password" &&
        (showText ? (
          <EyeOff
            onClick={handlePasswordShow}
            className="absolute-center-right"
          />
        ) : (
          <Eye onClick={handlePasswordShow} className="absolute-center-right" />
        ))}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
