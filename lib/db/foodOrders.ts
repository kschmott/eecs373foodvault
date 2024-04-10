import { FoodOrders } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export async function updateBoxStatus(id: number, box: number) {
  return db.update(FoodOrders).set({ box }).where(eq(FoodOrders.id, id));
}

export async function createFoodOrder(
  foodOrder: typeof FoodOrders.$inferInsert
) {
  const foodOrders = await getFoodOrders();
  if (foodOrders.length >= 4) {
    throw new Error("4 Orders max");
  }
  return db
    .insert(FoodOrders)
    .values(foodOrder)
    .returning({ insertedId: FoodOrders.id });
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
