import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const ambience = sqliteTable("ambience", {
  id: integer("id").primaryKey(),
  name: text("name"),
  description: text("description"),
});
