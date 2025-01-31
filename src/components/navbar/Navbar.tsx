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
import { SearchInput } from "../ui/search-input";
import { useEffect, useRef, useState } from "react";
import { cn, createSearchParamsUrl } from "@/utils/helper";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InternalServerError } from "@/utils/errors/errors";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useBoundStore } from "@/store/store";
import CShoppingCart from "../icons/CShoppingCart";

const searchSchema = z.object({
  search: z.string(),
});

type IFormFields = z.infer<typeof searchSchema>;

const routesForCart = ["/search", "/products"];
const routesForUser = ["/"];

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const token = useBoundStore((state) => state.token);

  console.log({ pathName });

  const { register, handleSubmit, setFocus, reset } = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const newParams = new URLSearchParams(searchParams.toString());
      if (data.search) {
        newParams.set("name", data.search);
      } else {
        newParams.delete("name");
      }
      let searchUrl;

      if (pathName === "/search") {
        searchUrl = createSearchParamsUrl(pathName, newParams);
        window.history.replaceState({}, "", searchUrl);
      } else {
        searchUrl = createSearchParamsUrl("/search", newParams);
        router.push(searchUrl);
      }
      setShowSearch(false);
    } catch (error) {
      InternalServerError();
    }
  };

  function toggleSearchInput() {
    setShowSearch((prev) => {
      return !prev;
    });
  }

  function handleOnClear() {
    reset();
  }

  function handleUserProfileClick() {
    if (token) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    if (showSearch) {
      setFocus("search");
    }
  }, [showSearch]);

  return (
    <header className="w-full relative">
      <div className="flex-between h-navbar px-2 border-b border-b-black">
        <Sheet>
          <SheetTrigger>
            <Menu className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white w-full">
            <SheetTitle></SheetTitle>
            <div className="flex justify-between">
              <SheetClose>
                <X className="cursor-pointer" />
              </SheetClose>
              <Gitlab />
              <CShoppingCart itemCount={0} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex gap-3">
          {routesForUser.includes(pathName) && (
            <CircleUserRound
              className="cursor-pointer"
              onClick={handleUserProfileClick}
            />
          )}
          {showSearch ? (
            <X onClick={toggleSearchInput} className="cursor-pointer" />
          ) : (
            <Search onClick={toggleSearchInput} className="cursor-pointer" />
          )}
          {routesForCart.includes(pathName) && <CShoppingCart itemCount={0} />}
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
