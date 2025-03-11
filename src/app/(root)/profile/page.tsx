"use client";

import { Button } from "@/components/ui/button";
import { logoutApi } from "@/services/auth/user-account";
import { useBoundStore } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();
  const logout = useBoundStore((state) => state.logout);

  async function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="main-container">
      <Link href={"/profile/details"}>Edit Profile</Link>
      <Button onClick={handleLogout} variant={"outline"} className="w-full">
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
