DO $$ BEGIN
 CREATE TYPE "public"."meal" AS ENUM('morning', 'afternoon', 'evening', 'bedtime');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('taken', 'not_taken', 'postponed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."notification_status" AS ENUM('pending', 'sent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
