"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/formFields/input";
import GoogleIcon from "@/components/icons/brand/GoogleIcon";
import { useAuthStore } from "@/store/Auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/validation/commonSchema";
import { loginApi } from "@/services/auth/user-account";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS, InternalServerError } from "@/lib/errors/errors";
import { IApiError } from "@/types/errors";
import FacebookIcon from "@/components/icons/brand/FacebookIcon";
import Divider from "@/components/ui/divider";

const credSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

type IFormFields = z.infer<typeof credSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const setToken = useAuthStore((state) => state.setToken);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormFields>({
    resolver: zodResolver(credSchema),
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const res = await loginApi(data);
      setToken(res.data.accessToken);
    } catch (error) {
      const typeError = error as IApiError;
      if (typeError.status === ERROR_STATUS.INVALID_CRED) {
        toast({
          title: "Invalid Credentails",
          variant: "destructive",
        });
      } else {
        InternalServerError();
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <p className="heading" style={{marginTop: '0'}} >Sign In your account</p>
      <p className="sub-heading text-center">
        Let's get started. Fill in the details below to <br /> create your
        account.
      </p>

      <div className="grid gap-2">
        <Button disabled={isSubmitting} variant="outline" className="w-full">
          <GoogleIcon />
          Sign in with Google
        </Button>
        <Button disabled={isSubmitting} variant="outline" className="w-full">
          <FacebookIcon />
          Sign in with Facebook
        </Button>
      </div>

     <Divider text="OR" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              errMsg={errors.email?.message}
            />
          </div>
          <div>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...register("password")}
              errMsg={errors.password?.message}
            />
            <a
              href="#"
              className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Sign In
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
