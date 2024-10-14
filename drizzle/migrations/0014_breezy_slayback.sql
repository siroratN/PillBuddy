ALTER TABLE "pillbuddy"."users" ALTER COLUMN "role" SET DATA TYPE role;--> statement-breakpoint
ALTER TABLE "pillbuddy"."users" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pillbuddy"."users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" ADD COLUMN "timing" text;--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" ADD COLUMN "success" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "pillbuddy"."patients" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "pillbuddy"."notifications" DROP COLUMN IF EXISTS "sent_at";