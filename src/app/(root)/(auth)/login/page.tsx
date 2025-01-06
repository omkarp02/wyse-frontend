import React from "react";
import { LoginForm } from "./_login-form";

const LoginPage = () => {
  return (
    <div className="flex-between min-h-vh main-container">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
