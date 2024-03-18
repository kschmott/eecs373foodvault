import {
  createFoodOrder,
  deleteFoodOrder,
  getFoodOrders,
} from "@/lib/db/foodOrders";
export const fetchCache = "only-no-store";
export async function GET(request: Request) {
  try {
    const foodOrder = await getFoodOrders();
    if (!foodOrder) {
      return Response.json({ message: "No orders to delete!" });
    }
    return Response.json(
      foodOrder.map((order) => ({
        ...order,
        createdAt: order.createdAt.toISOString(),
      }))
    );
  } catch (error: any) {
    return new Response("There was an error gettings the orders!", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    await createFoodOrder(data);
  } catch (error: any) {
    if (error.code === "23505") {
      return new Response("There is already an order with that name!", {
        status: 400,
      });
    }
  }

  return Response.json(data);
}
export const runtime = "edge";

export async function DELETE(request: Request) {
  const data = await request.json();
  try {
    await deleteFoodOrder(data.id);
  } catch (error: any) {
    return new Response("There was an error deleting the order!", {
      status: 500,
    });
  }

  return Response.json(data);
}
