ALTER TABLE "food_orders" RENAME COLUMN "inBox" TO "box";--> statement-breakpoint
ALTER TABLE "food_orders" ALTER COLUMN "box" SET DEFAULT -1;