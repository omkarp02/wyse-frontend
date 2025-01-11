import React from "react";
import { AuthForm } from "../_auth-form";
import { AUTH_PAGE_TYPE } from "@/lib/enums";

const RegisterPage = () => {
  return (
    <div className="flex-center main-container">
      <div className="w-full max-w-sm">
        <AuthForm
          type={AUTH_PAGE_TYPE.REGISTER}
          title="Sign Up your account"
          subTitle={
            <>
              Let's get started. Fill in the details below to <br /> create your
              account.
            </>
          }
        />
      </div>
    </div>
  );
};

export default RegisterPage;
