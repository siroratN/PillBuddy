ALTER TABLE "pillbuddy"."scheduels" ADD COLUMN "time" time NOT NULL;--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" ADD COLUMN "dosage_amount" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" ADD COLUMN "status" "status" DEFAULT 'not_taken';--> statement-breakpoint
ALTER TABLE "pillbuddy"."scheduels" ADD COLUMN "side_effects" text;