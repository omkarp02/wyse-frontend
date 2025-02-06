"use client";

import RouteNavbar from "@/components/navbar/RouteNavbar";
import CircleStepper from "@/components/stepper/circle-stepper";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Bag", id: 1 },
  { label: "Address", id: 2 },
  { label: "Payment", id: 3 },
];

const getStep: any = {
  "/shopping-bag": 1,
  "/address": 2,
  "/address/add": 2,
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <main>
      <RouteNavbar />
      <section className="px-6 my-6">
        <CircleStepper steps={steps} curStep={getStep[pathname]} />
      </section>
      {children}
    </main>
  );
}
