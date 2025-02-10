import React from "react";
import styles from "./loader.module.css";
import { cn } from "@/utils/helper";
import Loader from "./Loader";

type IScreenLoader = {
  open: boolean;
};

const ScreenLoader = ({ open }: IScreenLoader) => {
  if (!open) return "";

  return (
    <div className="flex-center  absolute top-0 left-0 min-h-screen h-full bg-[rgba(0,0,0,0.5)]  w-full">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
