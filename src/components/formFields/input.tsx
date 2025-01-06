import * as React from "react";

import { cn } from "@/lib/utils";

type IInput = React.ComponentProps<"input"> & {
  errMsg?: string;
};

const Input: React.FC<IInput> = ({ className, type, errMsg, ...props }) => {
  return (
    <div>
      <input
        type={type}
        className={cn(
          " h-10 w-full rounded-md border  bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          errMsg ? "border-destructive" : "border-input"
        )}
        {...props}
      />
      {errMsg && <p className="text-destructive text-xs">{errMsg}</p>}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
