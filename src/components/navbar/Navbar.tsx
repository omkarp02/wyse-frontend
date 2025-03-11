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
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

const searchSchema = z.object({
  search: z.string(),
});

type IFormFields = z.infer<typeof searchSchema>;

const routesForCart = ["search", "products", ""];
const routesForUser = [""];

const navList = [
  { label: "Men", path: "/search?gender=men" },
  { label: "Oversized Tees", path: "/search?category=oversized-tees" },
  { label: "Classic Tees", path: "/search?category=t-shirt" },
  { label: "Fashion Joggers", path: "/search?category=joggers" },
  { label: "Hoodies", path: "/search?category=hoodies" },
];

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar]  = useState(false)
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const token = useBoundStore((state) => state.token);
  const totalCartItems = useBoundStore((state) => state.totalCartItem);
  const logout = useBoundStore((state) => state.logout);

  useGetTotalCartCount();

  const formattedPathName = pathName.split("/")[1];

  const { register, handleSubmit, setFocus, reset } = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (!data.search) {
        toast({
          variant: "destructive",
          title: "Please enter something to search",
        });
        return;
      }
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

  async function handleLogout() {
    logout();
    router.replace("/");
  }

  function handleUserProfileClick() {
    if (token) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }


  function handleCategoryClick(){
    setShowSidebar(false)
  }

  useEffect(() => {
    if (showSearch) {
      setFocus("search");
    }
  }, [showSearch]);

  return (
    <header className="w-full fixed top-0 z-10 bg-background">
      <div className="flex-between h-navbar px-2 border-b border-b-black">
        <Sheet onOpenChange={(val)=> setShowSidebar(val)} open={showSidebar} >
          <SheetTrigger>
            <Menu className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white w-full">
            <SheetTitle></SheetTitle>
            <div className="flex flex-col h-full">
              <div className="flex justify-between">
                <SheetClose>
                  <X className="cursor-pointer" />
                </SheetClose>
                <Gitlab />
                <Link href={"/shopping-bag"}>
                  <CShoppingCart itemCount={totalCartItems} />
                </Link>
              </div>
              <section className="flex flex-col mt-4">
                {navList.map((e) => (
                  <>
                    <Link
                      className="text-xl  py-3  border-muted-100"
                      href={e.path}
                      onClick={handleCategoryClick}
                    >
                      {e.label}
                    </Link>
                    <hr />
                  </>
                ))}
              </section>
              <section className="mt-auto space-y-4">
                {token ? (
                  <>
                    <Button className="w-full" asChild>
                      <Link href={"/profile/details"}>Profile</Link>
                    </Button>
                    <Button className="w-full" variant={"outline"} onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" asChild>
                      <Link href={"/login"}>Log In or Sign Up</Link>
                    </Button>
                  </>
                )}
              </section>
            </div>
          </SheetContent>
        </Sheet>

        <Link href={"/"}>Logo</Link>
        <div className="flex gap-3">
          {/* {routesForUser.includes(formattedPathName) && (
            <CircleUserRound
              className="cursor-pointer"
              onClick={handleUserProfileClick}
            />
          )} */}
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
          placeholder={`Try searching "Hoodies"`}
          {...register("search")}
        />
      </form>
    </header>
  );
}
