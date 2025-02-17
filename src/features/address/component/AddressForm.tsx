"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  addressFormSchema,
  IAddressFormFields,
} from "@/features/address/libs/validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ADDRESS_TYPE, ADDRESS_TYPE_LIST } from "@/constants/api";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddUserAddress } from "@/hooks/mutation/address";
import ScreenLoader from "@/components/loader/ScreenLoader";
import { useEffect } from "react";

type IAddressFrom = {
  isLoading: boolean;
  onSubmit(data: IAddressFormFields): void;
  defaultValue: {
    address?: Partial<IAddressFormFields["address"]>;
    type?: Partial<IAddressFormFields["type"]>;
    isPrimary?: Partial<IAddressFormFields["isPrimary"]>;
  };
  isEditable?: boolean;
};

function AddressForm({
  onSubmit,
  isLoading,
  defaultValue,
  isEditable,
}: IAddressFrom) {
  const form = useForm<IAddressFormFields>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultValue,
  });
  

  useEffect(() => {
    if (defaultValue && isEditable) {
      form.reset({
        address: defaultValue.address,
        isPrimary: defaultValue.isPrimary,
        type: defaultValue.type,
      });
    }
  }, [defaultValue]);

  return (
    <div className="px-1 my-10 h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <p className="form-heading my-6">Contact Details</p>
          <FormField
            control={form.control}
            name="address.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Name*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.mobileNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Mobile No*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.alternateMobileNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Alternate Mobile No*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="form-heading my-6">address</p>
          <FormField
            control={form.control}
            name="address.pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Pin Code*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Address (House No, Building, Street, Area)*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="w-1/2 space-y-0">
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="City/District*"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="w-1/2 space-y-0">
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="State*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="form-heading my-6">Save address as</p>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex"
                  >
                    {ADDRESS_TYPE_LIST.map((e) => (
                      <FormItem key={e.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={e.value} />
                        </FormControl>
                        <FormLabel className="font-normal">{e.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPrimary"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Make this my default address</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            style={{ marginTop: "40px" }}
          >
            Submit
          </Button>
        </form>
      </Form>
      <ScreenLoader open={isLoading} />
    </div>
  );
}
export default AddressForm;
