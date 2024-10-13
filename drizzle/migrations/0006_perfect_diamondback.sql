ALTER TABLE "pillbuddy"."notification_medicines" RENAME COLUMN "medicines_id" TO "medicine_id";--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" DROP CONSTRAINT "notification_medicines_medicines_id_medicines_id_fk";
--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" DROP CONSTRAINT "notification_medicines_notification_id_medicines_id_pk";--> statement-breakpoint
ALTER TABLE "pillbuddy"."notification_medicines" ADD CONSTRAINT "notification_medicines_notification_id_medicine_id_pk" PRIMARY KEY("notification_id","medicine_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."notification_medicines" ADD CONSTRAINT "notification_medicines_medicine_id_medicines_id_fk" FOREIGN KEY ("medicine_id") REFERENCES "pillbuddy"."medicines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
