"use client";

import DatePicker from "@/components/formFields/date-picker";
import { Input } from "@/components/formFields/input";
import FacebookIcon from "@/components/icons/brand/FacebookIcon";
import GoogleIcon from "@/components/icons/brand/GoogleIcon";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { InternalServerError } from "@/utils/errors/errors";
import { emailSchema, mobileSchema } from "@/lib/validation/commonSchema";
import {
  IUpdateUserProfileApi,
  updateUserProfileApi,
} from "@/services/auth/user";
import { loginApi } from "@/services/auth/user-account";
import { IApiError } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { getMutationErrorMsg } from "@/utils/errors/errorHandler";
import ScreenLoader from "@/components/loader/ScreenLoader";
import { useGetUser } from "@/hooks/query/useGetProfile";
import { GENDER, GENDER_LIST } from "@/constants/api";

const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastname: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  dateofbirth: z.date(),
  gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]),
});

type IFormFields = z.infer<typeof registerSchema>;

const EditProfile = () => {
  const { toast } = useToast();
  const [showScreenLoader, setScreenLoader] = useState(false);

  const {isLoading, data: userProfile} =  useGetUser()

  const form = useForm<IFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const createMutation = useMutation({
    mutationFn: (payload: IUpdateUserProfileApi) =>
      updateUserProfileApi(payload),
    onSuccess: (data, id) => {
      form.reset({ firstname: "", lastname: "" });
      toast({
        title: "User Details Updated Successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error, "User");
      toast({
        title: msg,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setScreenLoader(false);
    },
  });


  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    setScreenLoader(true);
    createMutation.mutate(data);
  };

  useEffect(()=> {
    if(userProfile){
      form.reset({
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        dateofbirth: new Date(userProfile.dateofbirth),
        gender: userProfile.gender as GENDER
      })
    }
  },[userProfile])

  console.log(form.getValues("gender"))


  return (
    <div className="main-container">
      <p className="heading my-6">Profile Details</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-96 space-y-3">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateofbirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Of Birth</FormLabel>
                <FormControl>
                  <DatePicker
                    label="January 8th, 2025"
                    disabled={{ after: new Date() }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex"
                  >
                    {GENDER_LIST.map((e) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
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
          <div className="flex justify-end">
            <Button type="submit" className="w-full mt-5">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <ScreenLoader open={showScreenLoader} />
    </div>
  );
};

export default EditProfile;
