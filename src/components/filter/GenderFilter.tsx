import React from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";

const GenderFilter = ({ handleSubmit }: { handleSubmit(): void }) => {
  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Gender</DrawerTitle>
      </DrawerHeader>
      <Button variant={"ghost"} className="w-full">
        Male
      </Button>
      <Button variant={"ghost"} className="w-full">
        Boys
      </Button>
      <Button variant={"ghost"} className="w-full">
        Girls
      </Button>
      <Button variant={"ghost"} className="w-full">
        Women
      </Button>
    </div>
  );
};

export default GenderFilter;
