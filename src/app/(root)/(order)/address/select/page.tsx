"use client"

import { Button } from "@/components/ui/button";
import { useGetAddressList } from "@/hooks/query/address";
import Link from "next/link";
import React from "react";

const SelectAddressPage = () => {
  const { data: addressData } = useGetAddressList();

  return (
    <div className="px-1">
      {" "}
      <Link href="/address/add">
        <Button className="uppercase w-full my-4" size={"lg"}>
          Add new Address
        </Button>
      </Link>
      <p className="form-heading">Default address</p>
    </div>
  );
};

export default SelectAddressPage;
