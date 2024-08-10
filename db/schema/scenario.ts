import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const scenarios = sqliteTable("scenarios", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export type ScenarioType = typeof scenarios.$inferSelect;
