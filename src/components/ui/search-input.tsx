import * as React from "react";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="flex px-2 bg-secondary items-center rounded-md overflow-hidden">
      <Search size={20} />
      <input
        type={type}
        className={cn(
          "flex h-9 w-full bg-transparent  text-base px-2  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      <X />
    </div>
  );
});
SearchInput.displayName = "Input";

export { SearchInput };
