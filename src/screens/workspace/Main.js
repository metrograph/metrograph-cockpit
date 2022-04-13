import React, { useEffect } from "react";
import TopBar from "./TopBar";
export default function Main() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex grow">
        <div className="w-[384px]"></div>
        <div className="grow bg-cock-board"></div>
        <div className="w-[384px]"></div>
      </div>
    </div>
  );
}
