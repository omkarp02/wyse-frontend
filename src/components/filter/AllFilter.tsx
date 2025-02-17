import React, { useEffect, useState } from "react";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useGetFilter } from "@/hooks/query/filter";
import { Check } from "lucide-react";
import { cn, createSearchParamsUrl } from "@/utils/helper";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

export const enum FILTER_TYPE {
  SIZE = "sizes",
  COLOR = "colors",
}

const INITIAL_FILTER_STATE = {
  [FILTER_TYPE.SIZE]: [],
  [FILTER_TYPE.COLOR]: [],
};

let prevUrl = "";

const AllFilter = ({
  onOpenChange,
  handleSubmit,
}: {
  onOpenChange(val: boolean): void;
  handleSubmit?: () => void;
}) => {
  const searchParams = useSearchParams();
  const sizes = searchParams.get(FILTER_TYPE.SIZE)
    ? searchParams.get(FILTER_TYPE.SIZE)!.split(",")
    : [];
  const colors = searchParams.get(FILTER_TYPE.COLOR)
    ? searchParams.get(FILTER_TYPE.COLOR)!.split(",")
    : [];
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const name = searchParams.get("name");

  const { data: fitlerData } = useGetFilter({
    category,
    collection,
    count: true,
    name,
  });

  const [selectedFilterType, setSelectedFilterType] = useState("");
  const [filter, setFilter] = useState<{ [key: string]: string[] }>(
    INITIAL_FILTER_STATE
  );
  const pathName = usePathname();
  const [filterList, setFilterList] = useState([]);
  const filterTypeList = fitlerData?.map((e: any) => e.name);

  function handleClose() {
    window.history.replaceState({}, "", prevUrl);
    onOpenChange(false);
  }

  function handleFilterOnClick(val: string, type: string) {
    setFilter((prev) => {
      const index = prev[type].indexOf(val);
      if (index === -1) {
        prev[type].push(val);
      } else {
        prev[type].splice(index, 1);
      }
      return _.cloneDeep(prev);
    });
  }

  function handleClearAll() {
    setFilter(INITIAL_FILTER_STATE);
    // window.history.replaceState({}, "", pathName);
  }

  function handleApply() {
    const sizeFilter = filter[FILTER_TYPE.SIZE];
    const colorFilter = filter[FILTER_TYPE.COLOR];
    const newParams = new URLSearchParams(searchParams.toString());
    if (sizeFilter.length !== 0) {
      newParams.set(FILTER_TYPE.SIZE, sizeFilter.join(","));
    } else {
      newParams.delete(FILTER_TYPE.SIZE);
    }

    if (colorFilter.length !== 0) {
      newParams.set(FILTER_TYPE.COLOR, colorFilter.join(","));
    } else {
      newParams.delete(FILTER_TYPE.COLOR);
    }

    const searchUrl = createSearchParamsUrl(pathName, newParams);
    window.history.replaceState({}, "", searchUrl);
    onOpenChange(false);
  }

  useEffect(() => {
    if (selectedFilterType && fitlerData) {
      const index = fitlerData.findIndex(
        (e: any) => e.name === selectedFilterType
      );
      if (index !== -1) {
        setFilterList(fitlerData[index].filter);
      }
    }
    prevUrl = `${pathName}${window.location.search}`;
  }, [selectedFilterType]);

  useEffect(() => {
    setFilter({ [FILTER_TYPE.SIZE]: sizes, [FILTER_TYPE.COLOR]: colors });
  }, []);

  useEffect(() => {
    if (fitlerData) {
      setSelectedFilterType(fitlerData[0].name);
    }
  }, [fitlerData]);

  const getFitlerListFromType: { [key: string]: string[] } = {
    [FILTER_TYPE.SIZE]: sizes,
    [FILTER_TYPE.COLOR]: colors,
  };

  return (
    <div className="h-screen relative">
      <section className="flex gap-2 sticky top-[100vh]">
        <Button className="uppercase w-1/2" onClick={handleClose}>
          Close
        </Button>
        <Button className="uppercase w-1/2" onClick={handleApply}>
          apply
        </Button>
      </section>
      <DrawerHeader className="p-0 h-full block -mt-8">
        <DrawerTitle className="flex justify-between items-center px-2 h-10 border-b-[1px] border-black">
          <span className="capitalize">Filters</span>
          <Button
            onClick={handleClearAll}
            className="uppercase"
            variant={"ghost"}
          >
            clear all
          </Button>
        </DrawerTitle>
        <div className="flex h-full ">
          <section className="w-1/3  text-start bg-secondary">
            {filterTypeList?.map((e: string, id: number) => {
              return (
                <button
                  key={id}
                  className={cn(
                    "w-full py-3",
                    selectedFilterType === e ? "bg-white" : "bg-secondary"
                  )}
                  onClick={() => setSelectedFilterType(e)}
                >
                  {e}
                </button>
              );
            })}
          </section>
          <section className="w-2/3 px-4 overflow-y-auto">
            {filterList?.map((e: any) => {
              return (
                <div
                  key={e.value}
                  className={cn(
                    "flex gap-4 py-3 w-full  text-muted items-center"
                  )}
                  onClick={() => {
                    handleFilterOnClick(
                      e.name,
                      selectedFilterType.toLowerCase()
                    );
                  }}
                >
                  <Check
                    color={
                      filter[selectedFilterType.toLowerCase()]?.includes(e.name)
                        ? "black"
                        : "#465161"
                    }
                    size={18}
                  />
                  <span
                    className={cn(
                      filter[selectedFilterType.toLowerCase()]?.includes(e.name)
                        ? "text-black"
                        : "text-muted-foreground"
                    )}
                  >
                    {e.name}
                  </span>
                </div>
              );
            })}
          </section>
        </div>
      </DrawerHeader>
    </div>
  );
};

export default AllFilter;
