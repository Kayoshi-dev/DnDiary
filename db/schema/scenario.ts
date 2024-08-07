import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const scenarios = sqliteTable("scenarios", {
  id: integer("id").primaryKey(),
  name: text("name"),
});
