import React from "react";
import styles from "./loader.module.css";
import { cn } from "@/lib/utils";

const ScreenLoader = () => {
  return (
    <div className="flex-center bg-transparent absolute top-0 left-0 h-screen w-full">
      <div className={cn(styles.loader)}></div>
    </div>
  );
};

export default ScreenLoader;
