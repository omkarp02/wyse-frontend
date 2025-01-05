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
import {  useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/validation/commonSchema";
import { loginApi } from "@/services/auth/user-account";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS, InternalServerError } from "@/lib/errors/errors";
import { IApiError } from "@/types/errors";

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
      setToken(res.data.accessToken)
    } catch (error) {
      const typeError = error as IApiError
      if (typeError.status === ERROR_STATUS.INVALID_CRED){
        toast({
          title: "Invalid Credentails",
          variant: "destructive",
        });
      }else {
        InternalServerError()
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  errMsg={errors.email?.message}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password")}
                  errMsg={errors.password?.message}
                />
              </div>
              <Button disabled={isSubmitting} type="submit" className="w-full">
                Login
              </Button>
              <Button
                disabled={isSubmitting}
                variant="outline"
                className="w-full"
              >
                <GoogleIcon />
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
