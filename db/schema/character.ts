import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

import { scenarios } from "./scenario";

export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey(),
  name: text("name"),
  scenarioId: integer("scenario_id").references(() => scenarios.id),
});
