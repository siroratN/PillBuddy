import { InferSelectModel, max, min } from "drizzle-orm";
import { serial, text, pgTable, pgEnum, pgSchema, uuid, varchar, timestamp, integer, primaryKey, time, date } from "drizzle-orm/pg-core";

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

export const medicines = mySchema.table('medicines', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 100}).notNull(),
  dosage: varchar('dosage'),
  instructions: text('instructions'),
  type: varchar('type', {length: 50}).notNull(),
  side_effects: text('side_effects'),
  ...timestamps
})

const medicationStatus = pgEnum("status", ['taken', 'not_taken', 'postponed'])

export const schedules = mySchema.table("scheduels", {
  id: serial("id").primaryKey(),
  patient_id: serial("patient_id").references(()=> patients.id),
  caregivers_id: serial("caregivers_id").references(()=> caregivers.id),
  start_date: date('start_date').notNull(),
})

export const notification_medicines = mySchema.table("notification_medicines", {
  notification_id: serial('notification_id').references(()=> notifications.id),
  medicines_id: serial('medicines_id').references(()=> medicines.id),
  amount: integer('amount').notNull().default(1),
  dosage_amount: integer('dosage_amount').notNull().default(1),
}, table => {
  return {
    pk: primaryKey({ columns: [table.notification_id, table.medicines_id]})
  }
})

export const medication_log = mySchema.table("medication_log", {
  id: uuid('id').primaryKey(),
  schedule_id: serial('schedule_id').references(()=> schedules.id),
  status: medicationStatus('status').default('not_taken')
})

const notificationStatus = pgEnum("notification_status", ['pending', 'sent'])
const meal = pgEnum("meal", ['morning', 'afternoon', 'evening', 'bedtime'])

export const notifications = mySchema.table('notifications', {
  id: serial('id').primaryKey(),
  schedule_id: serial('schedule_id').references(() => schedules.id),
  notification_time: time('notification_time').notNull(),
  notification_status: notificationStatus('notification_status').default('pending'),
  meal: meal('meal').default("morning"),
  sent_at: timestamp('sent_at')
});

export type UserSchema = InferSelectModel<typeof users>
export type PatientSchema = InferSelectModel<typeof patients>
export type CaregiverSchema = InferSelectModel<typeof caregivers>
export type MedicineSchema = InferSelectModel<typeof caregivers>
export type ScheduleSchema = InferSelectModel<typeof schedules>
export type NotificationMedicinesSchema = InferSelectModel<typeof notification_medicines>
export type MedicationLogSchema = InferSelectModel<typeof medication_log>
export type NotificationSchema = InferSelectModel<typeof notifications>
