/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitBranchPlus, Menu, ShoppingCart, X } from "lucide-react";

export default function Component() {
  return (
    <header className="flex h-20 w-full shrink-0  px-4">
      <Sheet  >
        <SheetTrigger >
            <Menu />
        </SheetTrigger>
        <SheetContent side={'left'} className="bg-white w-full">
            <SheetTitle></SheetTitle>
          <div className="flex justify-between">
            <SheetClose><X /></SheetClose>
            <GitBranchPlus />
            <ShoppingCart />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
