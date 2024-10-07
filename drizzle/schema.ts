import { InferSelectModel } from "drizzle-orm";
import { serial, text, pgTable, pgSchema, uuid } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("pillbuddy");

export const users = mySchema.table('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
});

export type UserSchema = InferSelectModel<typeof users>