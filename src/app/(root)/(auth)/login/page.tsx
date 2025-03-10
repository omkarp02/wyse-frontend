import React from "react";
import { AuthForm } from "../_auth-form";
import { AUTH_PAGE_TYPE } from "@/utils/enums";

const LoginPage = () => {
  return (
    <div className="flex-center main-container">
      <div className="w-full max-w-sm">
        <AuthForm
          type={AUTH_PAGE_TYPE.LOGIN}
          title="Sign In your account"
          subTitle={
            <>
              Let&apos;s get started.
            </>
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
