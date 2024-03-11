import { FoodOrders } from "@/db/schema";
import axios from "axios";
export async function createFoodOrder(
  foodOrder: typeof FoodOrders.$inferInsert
) {
  return axios.post("/api/foodOrders", foodOrder, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
