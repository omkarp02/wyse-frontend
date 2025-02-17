"use client";

import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn, createSearchParamsUrl } from "@/utils/helper";
import { Checkbox } from "../ui/checkbox";
import { genderList, sortList } from "@/features/filter/data";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { FILTER_TYPE } from "./AllFilter";
import { useGetFilter } from "@/hooks/query/filter";
import { Button } from "../ui/button";

const DesktopProductFilter = ({ className }: { className: string }) => {
  const searchParams = useSearchParams();
  const sizes = searchParams.get(FILTER_TYPE.SIZE)
    ? searchParams.get(FILTER_TYPE.SIZE)!.split(",")
    : [];
  const colors = searchParams.get(FILTER_TYPE.COLOR)
    ? searchParams.get(FILTER_TYPE.COLOR)!.split(",")
    : [];
  const gender = searchParams.get("gender");
  const sortBy = searchParams.get("sort_by");
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const name = searchParams.get("name");

  const pathName = usePathname();

  const { data: filterData } = useGetFilter({ category, collection, name });

  const getSelectedValueForFilterData: { [key: string]: string[] } = {
    [FILTER_TYPE.SIZE]: sizes,
    [FILTER_TYPE.COLOR]: colors,
  };

  function handleClearAll() {
    const names = [FILTER_TYPE.SIZE, FILTER_TYPE.COLOR, "gender", "sort_by"];
    const newParams = new URLSearchParams(searchParams.toString());
    for (const item of names) {
      newParams.delete(item);
    }
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
  }

  return (
    <div className={cn("", className)}>
      <div className="mb-6 flex items-center justify-between px-2">
        <span className="text-xl">Filter</span>
        <Button
          onClick={handleClearAll}
          className="text-primary"
          variant={"ghost"}
        >
          Clear All
        </Button>
      </div>
      <hr />
      <Accordion type="single" collapsible className="w-full">
        {filterData &&
          filterData.map((e, i) => {
            return (
              <AccordionItem key={`item-${i}`} value={`item-${i}`}>
                <AccordionTrigger className="px-2">{e.name}</AccordionTrigger>
                <AccordionContent>
                  {e.filter.map(
                    (
                      filterItem: { name: string; stock: number },
                      i: number
                    ) => {
                      const selectedValues =
                        getSelectedValueForFilterData[e.name.toLowerCase()];

                      return (
                        <FilterItem
                          key={i}
                          name={e.name.toLowerCase()}
                          pathName={pathName}
                          searchParams={searchParams}
                          selectedValues={selectedValues}
                          value={filterItem.name}
                          label={filterItem.name}
                          stock={filterItem.stock}
                        />
                      );
                    }
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        <AccordionItem value={`item-gender`}>
          <AccordionTrigger className="px-2">Gender</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {genderList.map((e) => {
              return (
                <FilterItem
                  key={e.value}
                  searchParams={searchParams}
                  pathName={pathName}
                  name="gender"
                  selectedValues={gender ? [gender] : []}
                  value={e.value}
                  label={e.label}
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DesktopProductFilter;

const FilterItem = ({
  label,
  stock,
  name,
  value,
  selectedValues,
  pathName,
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
  label: string;
  stock?: number;
  value: string;
  name: string;
  selectedValues: string[];
  pathName: string;
}) => {
  function handleChange(checked: boolean | string, val: string) {
    console.log(checked);
    const newParams = new URLSearchParams(searchParams.toString());

    if (checked) {
      selectedValues.push(val);
    } else {
      const index = selectedValues.indexOf(val);
      if (index !== -1) {
        selectedValues.splice(index);
      }
    }

    if (selectedValues.length === 0) {
      newParams.delete(name);
    } else {
      newParams.set(name, selectedValues.join(","));
    }
    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
  }

  return (
    <div className="flex justify-between space-y-3 px-2 items-center">
      {" "}
      <div className="flex items-center">
        <Checkbox
          onCheckedChange={(checked) => handleChange(checked, value)}
          checked={selectedValues.includes(value)}
          id={`${name}-${value}`}
          value={value}
        />
        <label
          htmlFor={`${name}-${value}`}
          className="text-sm ms-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      {stock ? <span className="text-sm text-muted">({stock})</span> : ""}
    </div>
  );
};
