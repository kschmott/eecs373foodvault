import {
  createFoodOrder,
  deleteFoodOrder,
  getFoodOrders,
  updateBoxStatus,
} from "@/lib/db/foodOrders";
import crypto from "crypto";
import QRcode from "qrcode";
import fs from "fs";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");
  try {
    const foodOrder = await getFoodOrders();
    if (mode === "json") {
      return Response.json(
        foodOrder.map(
          (order) => ({
            ...order,
            createdAt: order.createdAt.toISOString(),
          }),
          { status: 200 }
        )
      );
    } else if (mode === "string") {
      const newFoodOrders = foodOrder.map((order) => {
        let id = order.id.toString();
        id = id.padStart(10, "0");
        const newOrder = {
          id: id,
          name: order.name.substring(0, 20),
        };
        return newOrder;
      });
      const foodOrdersString = newFoodOrders
        .map((order) => {
          return `${order.id}\0${order.name}`;
        })
        .join("\0");
      const numItems = newFoodOrders.length.toString().padStart(2, "0");
      return new Response(`DATA\0${numItems}\0${foodOrdersString}`, {
        status: 200,
      });
    }
  } catch (error: any) {
    return new Response("There was an error gettings the orders!", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const res = await createFoodOrder(data);
    // const signature = signAndEncodeText(res[0].insertedId.toString());
    // const qrCode = await generateQR("2");
    return Response.json({ id: res[0].insertedId }, { status: 200 });
  } catch (error: any) {
    if (error.code === "23505") {
      return new Response("There is already an order with that name!", {
        status: 400,
      });
    } else {
      console.log(error);
      return new Response("There was an error creating the order!", {
        status: 500,
      });
    }
  }
}
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const id = parseInt(searchParams.get("id") ?? "");
    await updateBoxStatus(id, 1);
    return Response.json({ id: id }, { status: 200 });
  } catch (error: any) {
    if (error.code === "23505") {
      return new Response("There is already an order with that name!", {
        status: 400,
      });
    } else {
      console.log(error);
      return new Response("There was an error creating the order!", {
        status: 500,
      });
    }
  }
}

function signAndEncodeText(text: string) {
  const signer = crypto.createSign("sha256");
  signer.update(text);
  signer.end();
  // Note: Actual signature might need to be truncated to fit the 200-character limit
  const signature = signer
    .sign(process.env.SECRET?.replace(/\\n/g, "\n") ?? "", "base64")
    .slice(0, 86); // Example truncation;
  // Concatenate or structure your data and signature efficiently
  return `${text}|${signature}`;
}

async function generateQR(data: string) {
  return new Promise((resolve, reject) => {
    QRcode.toDataURL(data, { errorCorrectionLevel: "L" }, (err, url) => {
      if (err) return reject(err);
      resolve(url);
    });
  });
}
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response("You must provide an id to delete an order!", {
      status: 400,
    });
  }
  try {
    await deleteFoodOrder(parseInt(id));
  } catch (error: any) {
    return new Response("There was an error deleting the order!", {
      status: 500,
    });
  }

  return new Response("Order deleted!", {
    status: 200,
  });
}
