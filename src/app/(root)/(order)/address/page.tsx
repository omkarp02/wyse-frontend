"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Button } from "@/components/ui/button";
import DisplayAddress from "@/features/address/component/DisplayAddress";
import { useGetAddressList, useGetPrimaryAddress } from "@/hooks/query/address";
import Link from "next/link";
import React from "react";

const AddressPage = () => {
  const { data: addressData, isLoading } = useGetPrimaryAddress();

  return (
    <>
      <div className="px-1 mt-[50px] h-[75vh] flex flex-col min-w-[320px]">
        {!addressData ? (
          <Link href="/address/add">
            <Button className="uppercase w-full my-4" size={"lg"}>
              Add new Address
            </Button>
          </Link>
        ) : (
          ""
        )}

        {addressData ? (
          <DisplayAddress
            address={addressData.address}
            id={addressData.id}
            isPrimary={addressData.isPrimary}
            type={addressData.type}
            selectedAddress=""
            hideRadio={true}
          >
            <Link href={"/address/select"} className="mt-6 block">
              <Button className="uppercase w-full">
                change or add address
              </Button>
            </Link>
          </DisplayAddress>
        ) : (
          ""
        )}

        <Link href={"/payment"} className="mt-auto">
          <Button className="w-full uppercase  " size={"lg"}>
            continue
          </Button>
        </Link>
      </div>
        <ScreenLoader open={isLoading} />
    </>
  );
};

export default AddressPage;
