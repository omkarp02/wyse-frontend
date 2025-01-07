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
  CircleUser,
  CircleUserRound,
  Gitlab,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { SearchInput } from "./ui/search-input";
import { useState } from "react";
import { cn, createSearchParamsUrl } from "@/lib/utils";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InternalServerError } from "@/lib/errors/errors";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const searchSchema = z.object({
  search: z.string(),
});

type IFormFields = z.infer<typeof searchSchema>;

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter()
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // const router = useRouter()

  const { register, handleSubmit, reset } = useForm<IFormFields>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("search", data.search);
      const searchUrl = createSearchParamsUrl(pathName, newParams);
      

    } catch (error) {
      InternalServerError();
    }
  };

  function toggleSearchInput() {
    setShowSearch((prev) => !prev);
  }

  function handleOnClear() {
    reset();
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

        <div className="flex gap-3">
          <CircleUserRound />
          {showSearch ? (
            <X onClick={toggleSearchInput} />
          ) : (
            <Search onClick={toggleSearchInput} />
          )}
          <ShoppingCart />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(" w-full bg-white p-2", showSearch ? "block" : "hidden")}
        style={{ zIndex: 1 }}
      >
        <SearchInput
          onClear={handleOnClear}
          placeholder="Search..."
          {...register("search")}
        />
      </form>
    </header>
  );
}
