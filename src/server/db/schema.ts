// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  date,
  decimal,
  index,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `contabl_${name}`);

export const currencyEnum = pgEnum("currency", ["USD", "ARS"]);
export const incomes = createTable(
  "incomes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: currencyEnum("currency").notNull().default("ARS"),
    // arsAtDate: ,
    // usdAtDate: ,
    // state: "received" | "not received",
    date: timestamp("date", { withTimezone: true }).defaultNow(), // TODO: Ver diferencia entre timezone base de datos y cliente
    isRecurring: boolean("is_recurring").notNull().default(false),
    recurrenceDate: date("recurrence_date", { mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.description),
  }),
);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  kindeId: text("kinde_id").notNull().unique(),
  firstName: varchar("first_name", { length: 128 }).notNull(),
  lastName: varchar("last_name", { length: 128 }).notNull(),
  email: varchar("email", { length: 128 }).notNull(),
  photo: text("photo"),
});
