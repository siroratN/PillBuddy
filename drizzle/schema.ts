import { InferSelectModel, max, min } from "drizzle-orm";
import { serial, text, pgTable, pgSchema, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("pillbuddy");

const timestamps = {
  updated_at: timestamp('updated_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  deleted_at: timestamp('deleted_at'),
}

export const users = mySchema.table('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
});

export const patients = mySchema.table('patients', {
  id: serial('id').primaryKey(),
  name: varchar("name", {length: 200}).notNull(),
  age: integer('age').notNull(),
  contact_info: text('contact_info')
})

export const caregivers = mySchema.table('caregivers', {
  id: serial('id').primaryKey(),
  name: varchar("name", {length: 200}).notNull(),
  relationship_to_patient: text('relation'),
  contact_info: text('contact_info')
})


export type UserSchema = InferSelectModel<typeof users>
export type patientsSchema = InferSelectModel<typeof patients>
export type caregiversSchema = InferSelectModel<typeof caregivers>