"use client"

import { testApi } from "@/services/test";
import React from "react";

const TestPage = () => {
  async function testthis() {
    try {
      const data = await testApi({ userId: "asdf", password: "asdf" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={testthis}>asldfksdf</button>
    </div>
  );
};

export default TestPage;
