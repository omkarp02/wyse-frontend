import React from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { createSearchParamsUrl } from "@/utils/helper";

const sortList = [
  { label: "What's new", value: "new" },
  { label: "Price - high to low", value: "high" },
  { label: "Popularity", value: "low" },
  { label: "Discount", value: "discount" },
  { label: "Price - low to high", value: "low" },
  { label: "Customer Rating", value: "rating" },
];

const SortFilter = ({
  handleSubmit,
  onOpenChange,
}: {
  onOpenChange(val: boolean): void;
  handleSubmit?: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const gender = searchParams.get("gender");

  function handleClick(val: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort_by", val);
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
    onOpenChange(false);
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>sort by</DrawerTitle>
      </DrawerHeader>
      {sortList.map((ele, index) => (
        <Button
          onClick={() => handleClick(ele.value)}
          variant={"ghost"}
          key={index}
          className="w-full text-sm"
        >
          {ele.label}
        </Button>
      ))}
    </div>
  );
};

export default SortFilter;
