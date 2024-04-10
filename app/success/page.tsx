"use client";
import React, { Suspense } from "react";
import QRCode from "./QRCode";

function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Order Created!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <QRCode code={searchParams.id} />
      </Suspense>

      {/* <img
        height={300}
        width={300}
        alt=""
        src={decodeURIComponent(searchParams.code)}
      /> */}
    </div>
  );
}

export default Page;
