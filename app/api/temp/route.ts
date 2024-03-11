import { deleteFoodOrder, getFoodOrder } from "@/lib/db/foodOrders";

export const runtime = "edge";

export async function DELETE() {
  try {
    const foodOrder = await getFoodOrder();
    if (!foodOrder) {
      return Response.json({ message: "No orders to delete!" });
    }
    await deleteFoodOrder(foodOrder.id);
  } catch (error: any) {
    return new Response("There was an error deleting the order!", {
      status: 500,
    });
  }

  return Response.json({ message: "Food Order Deleted" });
}
