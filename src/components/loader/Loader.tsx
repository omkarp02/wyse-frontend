import React from "react";
import styles from "./loader.module.css";
import { cn } from "@/utils/helper";

const Loader = () => {
  return <div className={cn(styles.loader)}></div>;
};

export default Loader;
