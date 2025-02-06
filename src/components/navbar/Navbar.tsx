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
import { useGetTotalCartCount } from "@/hooks/query/cart";

const searchSchema = z.object({
  search: z.string(),
});

type IFormFields = z.infer<typeof searchSchema>;

const routesForCart = ["search", "products"];
const routesForUser = [""];

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const token = useBoundStore((state) => state.token);
  const totalCartItems = useBoundStore((state) => state.totalCartItem);

  if (token) {
    useGetTotalCartCount();
  }

  const formattedPathName = pathName.split("/")[1];

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

      if (formattedPathName === "search") {
        searchUrl = createSearchParamsUrl(formattedPathName, newParams);
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
    <header className="w-full fixed top-0 z-10 bg-background">
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
              <Link href={"/shopping-bag"}>
                <CShoppingCart itemCount={totalCartItems} />
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link href={"/"}>Logo</Link>
        <div className="flex gap-3">
          {routesForUser.includes(formattedPathName) && (
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
          {routesForCart.includes(formattedPathName) && (
            <Link href={"/shopping-bag"}>
              <CShoppingCart itemCount={totalCartItems} />
            </Link>
          )}
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
