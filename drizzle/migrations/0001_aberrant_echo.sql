DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('taken', 'not_taken', 'postponed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."caregivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"relation" text,
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
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"age" integer NOT NULL,
	"contact_info" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."schedule_medicines" (
	"schedule_id" serial NOT NULL,
	"medicines_id" serial NOT NULL,
	CONSTRAINT "schedule_medicines_schedule_id_medicines_id_pk" PRIMARY KEY("schedule_id","medicines_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pillbuddy"."scheduels" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" serial NOT NULL,
	"caregivers_id" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."medication_log" ADD CONSTRAINT "medication_log_schedule_id_scheduels_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "pillbuddy"."scheduels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."schedule_medicines" ADD CONSTRAINT "schedule_medicines_schedule_id_scheduels_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "pillbuddy"."scheduels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pillbuddy"."schedule_medicines" ADD CONSTRAINT "schedule_medicines_medicines_id_medicines_id_fk" FOREIGN KEY ("medicines_id") REFERENCES "pillbuddy"."medicines"("id") ON DELETE no action ON UPDATE no action;
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
