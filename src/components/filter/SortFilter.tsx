import React from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { createSearchParamsUrl } from "@/utils/helper";
import { sortList } from "@/features/filter/data";



const SortFilter = ({
  handleSubmit,
  onOpenChange,
}: {
  onOpenChange(val: boolean): void;
  handleSubmit?: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

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
