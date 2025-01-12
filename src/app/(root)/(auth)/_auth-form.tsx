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
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/validation/commonSchema";
import { loginApi, registerApi } from "@/services/auth/user-account";
import { useToast } from "@/hooks/use-toast";
import { ERROR_STATUS, InternalServerError } from "@/lib/errors/errors";
import { IApiError } from "@/types/errors";
import FacebookIcon from "@/components/icons/brand/FacebookIcon";
import Divider from "@/components/ui/divider";
import Link from "next/link";
import { AUTH_PAGE_TYPE } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { useBoundStore } from "@/store/store";

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const registerSchema = z
  .object({
    email: emailSchema,
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type IFormFields = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;

interface IAuthForm extends React.ComponentPropsWithoutRef<"div"> {
  type: AUTH_PAGE_TYPE;
  title: string;
  subTitle: React.ReactNode;
}

export function AuthForm({
  className,
  type,
  title,
  subTitle,
  ...props
}: IAuthForm) {
  const router = useRouter();
  const setToken = useBoundStore(state => state.setToken)
  const { toast } = useToast();

  const isLogin = type === AUTH_PAGE_TYPE.LOGIN;

  const formSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormFields>({
    resolver: zodResolver(formSchema),
  });

  const fullErrors: FieldErrors<z.infer<typeof registerSchema>> = errors;

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (isLogin) {
        const res = await loginApi(data);
        setToken(res.data.accessToken);
      } else {
        const res = await registerApi({
          email: data.email,
          password: data.password,
        });

        if (res.status === -1) {
          toast({
            title: "Registered Successfully",
            variant: "default",
          });
        }

        router.push("/login");
      }
    } catch (error) {
      const typeError = error as IApiError;
      console.log(typeError);
      if (typeError.status === ERROR_STATUS.INVALID_CRED) {
        toast({
          title: "Invalid Credentails",
          variant: "destructive",
        });
      } else if (typeError.status === ERROR_STATUS.ALREADY_EXIST) {
        toast({
          title: "Account already exists, please sign in",
          variant: "destructive",
        });
      } else {
        InternalServerError();
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <p className="heading" style={{ marginTop: "0" }}>
        {title}
      </p>
      <p className="sub-heading text-center">{subTitle}</p>

      <div className="grid gap-2">
        <Link href={`${BACKEND_URL}/auth/google`}>
          <Button disabled={isSubmitting} variant="outline" className="w-full">
            <GoogleIcon />
            {isLogin ? "Sign in with Google" : "Sign Up with Google"}
          </Button>
        </Link>
        <Button disabled={isSubmitting} variant="outline" className="w-full">
          <FacebookIcon />
          {isLogin ? "Sign in with Facebook" : "Sign Up with Facebook"}
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
          {!isLogin && (
            <div>
              {" "}
              <Input
                id="password"
                placeholder="Password"
                type="password"
                {...register("password")}
                errMsg={errors.password?.message}
              />
              {isLogin && (
                <a
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              )}
            </div>
          )}
          <div>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              errMsg={fullErrors.confirmPassword?.message}
            />
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account" : "Already have an account ?"}
          <Link href={isLogin ? "/register" : "/login"} className="link mx-2">
            {isLogin ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </form>
    </div>
  );
}
