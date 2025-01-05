"use client";

import React from "react";
import Image from "next/image";

const TestPage = () => {
  return (
    <div>
      <Image
        className="w-[250px] md:w-[400px] h-auto"
        src={"https://i.imgur.com/zKZGfxC.jpeg"}
        alt="asdf"
        width={400}
        height={266}
      />
    </div>
  );
};

export default TestPage;
