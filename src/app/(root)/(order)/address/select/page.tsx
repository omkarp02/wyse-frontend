"use client";

import ScreenLoader from "@/components/loader/ScreenLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DisplayAddress from "@/features/address/component/DisplayAddress";
import {
  useDeleteAddress,
  useDeleteAddressByUserIds,
  useUpdateAddressIsPrimary,
} from "@/hooks/mutation/address";
import { useGetAddressList } from "@/hooks/query/address";
import { toast } from "@/hooks/use-toast";
import { IResGetAddressApi } from "@/services/user/address";
import { reportWebVitals } from "next/dist/build/templates/pages";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

let prevAddress = "";
const SelectAddressPage = () => {
  const { data: addressData } = useGetAddressList();
  const addressMutation = useUpdateAddressIsPrimary();
  const deleteAddressMutation = useDeleteAddressByUserIds();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [deletedAddressIdsList, setDeletedAddressIdsList] = useState<string[]>(
    []
  );

  const handleAddressOnChange = (val: string) => {
    setSelectedAddress(val);
  };

  function handleSubmit() {
    if (!selectedAddress) {
      toast({ variant: "destructive", title: "Select one address" });
      return;
    }
    if (deletedAddressIdsList.length !== 0) {
      deleteAddressMutation.mutate({ ids: deletedAddressIdsList });
    }
    if (prevAddress !== selectedAddress) {
      addressMutation.mutate({ id: selectedAddress, isPrimary: true });
    }
  }

  function handleRemoveAddress(id: string) {
    setSelectedAddress("");
    setDeletedAddressIdsList((prev) => {
      prev = [...prev, id];
      return prev;
    });
  }

  useEffect(() => {
    const selectedAddress = addressData?.[0] ?? null;
    if (selectedAddress?.isPrimary) {
      prevAddress = selectedAddress.id;
      setSelectedAddress(selectedAddress.id);
    }
  }, [addressData]);

  return (
    <div className="px-1">
      <Button
        onClick={handleSubmit}
        className="w-full uppercase  sticky top-[94vh]"
        size={"lg"}
      >
        confirm
      </Button>
      <Link href="/address/add">
        <Button className="uppercase w-full my-4" size={"lg"}>
          Add new Address
        </Button>
      </Link>
      <section className="px-2">
        <RadioGroup
          onValueChange={handleAddressOnChange}
          value={selectedAddress}
          defaultValue="option-one"
        >
          {addressData?.map((e, i) => {
            if (!deletedAddressIdsList.includes(e.id)) {
              return (
                <div className="my-2" key={e.id}>
                  {i < 2 ? (
                    <p className="form-heading mb-4">
                      {e.isPrimary ? "Default address" : "Other Address"}
                    </p>
                  ) : (
                    ""
                  )}

                  <div className="flex gap-2">
                    <RadioGroupItem className="mt-2" value={e.id} id={e.id} />
                    <DisplayAddress selectedAddress={selectedAddress} {...e}>
                      {e.id === selectedAddress ? (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleRemoveAddress(e.id)}
                            className="uppercase"
                            variant={"outline"}
                          >
                            Remove
                          </Button>
                          <Link href={`/address/edit/${e.id}`}>
                            <Button className="uppercase" variant={"outline"}>
                              Edit
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )}
                    </DisplayAddress>
                  </div>
                </div>
              );
            }
            return "";
          })}
        </RadioGroup>
      </section>
      <div className="h-14"></div>
      <ScreenLoader
        open={addressMutation.isPending || deleteAddressMutation.isPending}
      />
    </div>
  );
};

export default SelectAddressPage;
