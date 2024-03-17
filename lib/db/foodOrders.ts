import { FoodOrders } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export async function createFoodOrder(
  foodOrder: typeof FoodOrders.$inferInsert
) {
  return db.insert(FoodOrders).values(foodOrder);
}

export async function getFoodOrder() {
  return db.query.FoodOrders.findFirst({
    orderBy: (orders, { asc }) => [asc(orders.createdAt)],
  });
}
export async function getFoodOrders() {
  return db.query.FoodOrders.findMany({
    orderBy: (orders, { asc }) => [asc(orders.createdAt)],
  });
}
export async function deleteFoodOrder(id: number) {
  return db.delete(FoodOrders).where(eq(FoodOrders.id, id));
}
