CREATE SCHEMA "pillbuddy";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text
);
