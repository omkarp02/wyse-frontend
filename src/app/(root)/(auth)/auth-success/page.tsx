"use client";

import { ROUTES } from "@/lib/enums";
import { useBoundStore } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
  const jwt = searchParams.get("token") || null;
  const router = useRouter()

  const setToken = useBoundStore((state) => state.setToken);

  if (jwt) {
    setToken(jwt);
    router.replace(ROUTES.HOME)
  }else{
    router.back()
  }

  return null;
};

export default AuthSuccess;
