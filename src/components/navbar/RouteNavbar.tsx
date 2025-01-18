"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RouteNavbar() {
  const router = useRouter();
  const pathName = usePathname()

  function handleBack() {
    router.back();
  }

  return (
    <header className="w-full relative">
      <div className="flex items-center gap-4 h-navbar px-2 border-b ">
          <ArrowLeft className="cursor-pointer" onClick={handleBack} />
          <span className="text-semibold text-lg capitalize">{pathName.split("/")[1]}</span>
      </div>
    </header>
  );
}
