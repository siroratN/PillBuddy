
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."caregivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkID" text,
	"name" varchar(200) NOT NULL,
	"contact_info" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."medication_log" (
	"id" uuid PRIMARY KEY NOT NULL,
	"schedule_id" serial NOT NULL,
	"status" "status" DEFAULT 'not_taken'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."medicines" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"dosage" varchar,
	"instructions" text,
	"type" varchar(50) NOT NULL,
	"side_effects" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."notification_medicines" (
	"id" serial PRIMARY KEY NOT NULL,
	"notification_id" serial NOT NULL,
	"medicine_id" serial NOT NULL,
	"dosage_amount" integer DEFAULT 1 NOT NULL,
	"timing" text,
	"success" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"schedule_id" serial NOT NULL,
	"notification_time" time NOT NULL,
	"notification_status" "notification_status" DEFAULT 'pending',
	"meal" "meal" DEFAULT 'morning'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkID" text,
	"name" varchar(200) NOT NULL,
	"age" integer NOT NULL,
	"contact_info" text,
	"phone_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."scheduels" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" serial NOT NULL,
	"caregivers_id" serial NOT NULL,
	"start_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkID" text,
	"name" text,
	"email" text,
	"role" "role"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."medication_log" ADD CONSTRAINT "medication_log_schedule_id_scheduels_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "pillbuddy"."scheduels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."notification_medicines" ADD CONSTRAINT "notification_medicines_notification_id_notifications_id_fk" FOREIGN KEY ("notification_id") REFERENCES "pillbuddy"."notifications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."notification_medicines" ADD CONSTRAINT "notification_medicines_medicine_id_medicines_id_fk" FOREIGN KEY ("medicine_id") REFERENCES "pillbuddy"."medicines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."notifications" ADD CONSTRAINT "notifications_schedule_id_scheduels_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "pillbuddy"."scheduels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."scheduels" ADD CONSTRAINT "scheduels_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "pillbuddy"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."scheduels" ADD CONSTRAINT "scheduels_caregivers_id_caregivers_id_fk" FOREIGN KEY ("caregivers_id") REFERENCES "pillbuddy"."caregivers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
