import Image from "next/image";
import React from "react";

const BrandLogo = () => {
  return (
    <Image
      src={"/logo.png"}
      width={50}
      height={50}
      alt="facebook icon"
    />
  );
};

export default BrandLogo;
