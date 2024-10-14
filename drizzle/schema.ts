import { InferSelectModel, max, min, relations } from 'drizzle-orm';
import {
	serial,
	text,
	pgTable,
	pgEnum,
	pgSchema,
	uuid,
	varchar,
	timestamp,
	integer,
	primaryKey,
	time,
	date,
} from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('pillbuddy');

const timestamps = {
	updated_at: timestamp('updated_at'),
	created_at: timestamp('created_at').defaultNow().notNull(),
	deleted_at: timestamp('deleted_at'),
};

export const users = mySchema.table('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	clerkID: text('clerkID'),
	name: text('name'),
	role: text('role'),
	email: varchar('email', { length: 255 }).notNull(),
});

export const patients = mySchema.table('patients', {
	id: serial('id').primaryKey(),
	clerkID: text('clerkID'),
	name: varchar('name', { length: 200 }).notNull(),
	age: integer('age').notNull(),
	contact_info: text('contact_info'),
});

export const caregivers = mySchema.table('caregivers', {
	id: serial('id').primaryKey(),
	clerkID: text('clerkID'),
	name: varchar('name', { length: 200 }).notNull(),
	contact_info: text('contact_info'),
});

export const medicines = mySchema.table('medicines', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	dosage: varchar('dosage'),
	instructions: text('instructions'),
	type: varchar('type', { length: 50 }).notNull(),
	side_effects: text('side_effects'),
	...timestamps,
});

const medicationStatus = pgEnum('status', ['taken', 'not_taken', 'postponed']);

export const schedules = mySchema.table('scheduels', {
	id: serial('id').primaryKey(),
	patient_id: serial('patient_id').references(() => patients.id),
	caregivers_id: serial('caregivers_id').references(() => caregivers.id),
	start_date: date('start_date').notNull(),
});

export const notification_medicines = mySchema.table(
	'notification_medicines',
	{
		id: serial('id').primaryKey(),
		notification_id: serial('notification_id').references(() => notifications.id),
		medicine_id: serial('medicine_id').references(() => medicines.id),
		dosage_amount: integer('dosage_amount').notNull().default(1),
	},
);

export const medication_log = mySchema.table('medication_log', {
	id: uuid('id').primaryKey(),
	schedule_id: serial('schedule_id').references(() => schedules.id),
	status: medicationStatus('status').default('not_taken'),
});

const notificationStatus = pgEnum('notification_status', ['pending', 'sent']);
const meal = pgEnum('meal', ['morning', 'afternoon', 'evening', 'bedtime']);

export const notifications = mySchema.table('notifications', {
	id: serial('id').primaryKey(),
	schedule_id: serial('schedule_id').references(() => schedules.id),
	notification_time: time('notification_time').notNull(),
	notification_status: notificationStatus('notification_status').default('pending'),
	meal: meal('meal').default('morning'),
	sent_at: timestamp('sent_at'),
});

// relations

export const notificationRelations = relations(notifications, ({ one }) => ({
	schedule: one(schedules, {
		fields: [notifications.schedule_id],
		references: [schedules.id],
	}),
}));

export const scheduleRelations = relations(schedules, ({ one, many }) => ({
	patient: one(patients, {
		fields: [schedules.patient_id],
		references: [patients.id],
	}),
}));

export const NotificationMedicinesRelations = relations(notifications, ({ many }) => ({
	medicines: many(medicines),
	notifications: many(notifications),
}));

export type UserSchema = InferSelectModel<typeof users>;
export type PatientSchema = InferSelectModel<typeof patients>;
export type CaregiverSchema = InferSelectModel<typeof caregivers>;
export type MedicineSchema = InferSelectModel<typeof medicines>;
export type ScheduleSchema = InferSelectModel<typeof schedules>;
export type NotificationMedicinesSchema = InferSelectModel<typeof notification_medicines>;
export type MedicationLogSchema = InferSelectModel<typeof medication_log>;
export type NotificationSchema = InferSelectModel<typeof notifications>;
