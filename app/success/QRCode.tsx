import React from "react";
import qrcode from "qrcode";
function QRCode({ code }: { code: string }) {
  React.useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    qrcode.toCanvas(canvas, code, { width: 300 }, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, []);
  return (
    <div>
      <canvas id="canvas" className="m-auto"></canvas>
    </div>
  );
}

export default QRCode;
