// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  index,
  pgTableCreator,
  serial,
  time,
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

export const incomes = createTable(
  "income",
  {
    id: serial("id").primaryKey(),
    description: varchar("description", { length: 256 }),
    amount: decimal("amount", { precision: 12, scale: 2 }),
    date: timestamp("date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    isRecurring: boolean("is_recurring"),
    recurrenceDate: date("recurrence_date", { mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.description),
  }),
);
