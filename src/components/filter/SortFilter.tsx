import React from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";

const sortList = [
  { label: "What's new" },
  { label: "Price - high to low" },
  { label: "Popularity" },
  { label: "Discount" },
  { label: "Price - low to high" },
  { label: "Customer Rating" },
];

const SortFilter = ({ handleSubmit }: { handleSubmit(): void }) => {
  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>sort by</DrawerTitle>
      </DrawerHeader>
      {sortList.map((ele, index) => (
        <Button variant={"ghost"} key={index} className="w-full text-sm">{ele.label}</Button>
      ))}
    </div>
  );
};

export default SortFilter;
