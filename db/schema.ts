import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";

export const FoodOrders = pgTable(
  "food_orders",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    box: integer("box").default(-1).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      createdAtIdx: index("createdAt").on(table.createdAt),
    };
  }
);
