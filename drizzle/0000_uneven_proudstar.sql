CREATE TABLE IF NOT EXISTS "food_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "food_orders_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdAt" ON "food_orders" ("createdAt");