"use client";

import { ROUTES } from "@/utils/enums";
import { useBoundStore } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || null;
  const router = useRouter()

  const setLoggedIn = useBoundStore((state) => state.setLoggedIn);

  if (token) {
    setLoggedIn({token: token});
    router.replace(ROUTES.HOME)
  }else{
    router.back()
  }

  return null;
};

export default AuthSuccess;
