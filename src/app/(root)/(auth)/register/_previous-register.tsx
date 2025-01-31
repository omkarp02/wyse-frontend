"use client";

import DatePicker from "@/components/formFields/date-picker";
import { Input } from "@/components/formFields/input";
import FacebookIcon from "@/components/icons/brand/FacebookIcon";
import GoogleIcon from "@/components/icons/brand/GoogleIcon";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { InternalServerError } from "@/utils/errors/errors";
import { emailSchema, mobileSchema } from "@/lib/validation/commonSchema";
import { loginApi } from "@/services/auth/user-account";
import { IApiError } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" }),
    lastname: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" }),
    birthdate: z.date(),
    mobilenumber: mobileSchema,
    email: emailSchema,
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type IFormFields = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      console.log(data.birthdate)
      // const res = await loginApi(data);
    } catch (error) {
      const typeError = error as IApiError;

      InternalServerError();
    }
  };

  return (
    <div className="main-container">
      <p className="heading my-6">Register</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex flex-col gap-3">
          <Input
            id="firstname"
            type="text"
            placeholder="First Name"
            {...register("firstname")}
            errMsg={errors.firstname?.message}
          />
          <Input
            id="lastname"
            type="text"
            placeholder="Last Name"
            {...register("lastname")}
            errMsg={errors.lastname?.message}
          />
          <Controller
            name="birthdate"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <DatePicker
                label="Birth Date"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Input
            id="mobilenumber"
            type="number"
            placeholder="Mobile Number"
            {...register("mobilenumber")}
            errMsg={errors.mobilenumber?.message}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            errMsg={errors.email?.message}
          />

          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
            errMsg={errors.password?.message}
          />
          <Input
            id="confirmpassword"
            type="text"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            errMsg={errors.confirmPassword?.message}
          />
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full mt-6">
          Sign In
        </Button>
        <p className="mt-4 text-sm text-center">
          Already Registered? <Link href="/login" className="link" >Login</Link>
        </p>
      </form>

      <Divider className="my-4"  text="OR" />
      <div className="flex-center gap-5">
        <FacebookIcon size={'lg'} />
        <GoogleIcon size={'lg'} />
      </div>
    </div>
  );
};

export default RegisterPage;
