import {
  createFoodOrder,
  deleteFoodOrder,
  getFoodOrders,
} from "@/lib/db/foodOrders";
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
        id.padStart(10, "0");
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
        .join("|");
      const numItems = newFoodOrders.length.toString().padStart(2, "0");
      return new Response(`${numItems}\0${foodOrdersString}`, {
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
