DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('patient', 'caregiver');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
