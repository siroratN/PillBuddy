ALTER TABLE "pillbuddy"."notifications" ADD COLUMN "success" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" DROP COLUMN IF EXISTS "success";