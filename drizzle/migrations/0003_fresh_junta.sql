ALTER TABLE "pillbuddy"."medicines" ADD COLUMN "side_effects" text;--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" DROP COLUMN IF EXISTS "side_effects";