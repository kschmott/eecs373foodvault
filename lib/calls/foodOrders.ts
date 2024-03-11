import axios from "axios";
export async function createFoodOrder(foodOrder: { name: string }) {
  return axios.post("/api/foodOrders", foodOrder, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
