"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { iconVariants } from "@/types/props";
import { ArrowUpDown, Filter } from "lucide-react";
import React, { useState } from "react";
import GenderFilter from "./GenderFilter";
import SortFilter from "./SortFilter";
import AllFilter from "./AllFilter";
import { showOnMobileClass } from "@/constants/common";

const enum FILTER_TYPE {
  GENDER,
  SORT,
  ALL,
}

const filterTypeList = [
  {
    label: "Gender",
    value: FILTER_TYPE.GENDER,
    icon: "",
  },
  {
    label: "Sort",
    value: FILTER_TYPE.SORT,
    icon: <ArrowUpDown />,
  },
  {
    label: "Filter",
    value: FILTER_TYPE.ALL,
    icon: <Filter />,
  },
];

const MobileProductFilter = ({ handleSubmit }: { handleSubmit?: () => void }) => {
  const [filterType, setFilterType] = useState<FILTER_TYPE | null>(null);
  const [open, setOpen] = useState(false);

  function handleFilterOnClick(value: FILTER_TYPE) {
    setFilterType(value);
  }

  function onOpenChange(val: boolean) {
    setOpen(val);
  }

  const filterComp = {
    [FILTER_TYPE.GENDER]: <GenderFilter onOpenChange={onOpenChange} handleSubmit={handleSubmit} />,
    [FILTER_TYPE.SORT]: <SortFilter onOpenChange={onOpenChange} handleSubmit={handleSubmit} />,
    [FILTER_TYPE.ALL]: (
      <AllFilter onOpenChange={onOpenChange} handleSubmit={handleSubmit} />
    ),
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className={`${showOnMobileClass}`} asChild>
        <div className="flex items-center fixed bottom-0 bg-background w-full">
          {filterTypeList.map((ele, index) => {
            return (
              <>
                <Button
                  variant={"ghost"}
                  onClick={() => handleFilterOnClick(ele.value)}
                  className="w-full"
                >
                  {ele.icon} {ele.label}
                </Button>
                {index !== filterTypeList.length - 1 && (
                  <div className="w-[2px] h-[22px] bg-black-300"></div>
                )}
              </>
            );
          })}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        {filterType !== null ? (
          filterComp[filterType]
        ) : (
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>None</DrawerTitle>
            </DrawerHeader>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileProductFilter;
