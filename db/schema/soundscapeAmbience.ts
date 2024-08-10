import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { ambience } from "./ambience";
import { soundscape } from "./soundscape";

// Define the SoundscapeAmbience junction table
export const soundscapeAmbience = sqliteTable("soundscape_ambience", {
  id: integer("id").primaryKey(),

  soundscapeId: integer("soundscape_id")
    .references(() => soundscape.id)
    .notNull(),

  ambienceId: integer("ambience_id")
    .references(() => ambience.id)
    .notNull(),
});
