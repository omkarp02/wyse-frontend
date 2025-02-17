import React from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { createSearchParamsUrl } from "@/utils/helper";
import { genderList } from "@/features/filter/data";



const GenderFilter = ({
  handleSubmit,
  onOpenChange,
}: {
  onOpenChange(val: boolean): void;
  handleSubmit?: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname()
  const gender = searchParams.get("gender");

  function handleClick(val: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      newParams.delete("gender");
    } else {
      newParams.set("gender", val);
    }
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
    onOpenChange(false);
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Gender</DrawerTitle>
      </DrawerHeader>
      {genderList.map((e) => (
        <Button
          key={e.value}
          variant={"ghost"}
          onClick={() => handleClick(e.value)}
          className="w-full"
        >
          {e.label}
        </Button>
      ))}
    </div>
  );
};

export default GenderFilter;
