"use client";
import React from "react";
import qrcode from "qrcode";
function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  React.useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    qrcode.toCanvas(canvas, searchParams.id, { width: 300 }, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, []);
  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Order Created!</h1>
      <canvas id="canvas" className="m-auto"></canvas>
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
