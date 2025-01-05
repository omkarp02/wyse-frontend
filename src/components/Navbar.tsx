"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Gitlab,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { SearchInput } from "./ui/search-input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Component() {
  const [showSearch, setShowSearch] = useState(false);

  function toggleSearchInput() {
    setShowSearch((prev) => !prev);
  }

  return (
    <header className=" w-full relative">
      <div className="flex-between navbar-h px-2 border-b border-b-black">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white w-full">
            <SheetTitle></SheetTitle>
            <div className="flex justify-between">
              <SheetClose>
                <X />
              </SheetClose>
              <Gitlab />
              <ShoppingCart />
            </div>
          </SheetContent>
        </Sheet>
        <Link href={"/"}><Gitlab /></Link>
        <div className="flex gap-3">
          {showSearch ? (
            <X onClick={toggleSearchInput} />
          ) : (
            <Search onClick={toggleSearchInput} />
          )}
          <ShoppingCart />
        </div>
      </div>
      <div
        className={cn(" w-full bg-white p-2", showSearch ? "block" : "hidden")}
        style={{ zIndex: 1 }}
      >
        <SearchInput placeholder="Search..." />
      </div>
    </header>
  );
}
