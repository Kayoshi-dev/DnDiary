import type { RequestHandler } from "./$types";
import { db } from "$lib/server/Database";
import { scenarios as ScenarioSchema } from "$db/scenario";

export const GET: RequestHandler = async () => {
  const scenarios = db.select().from(ScenarioSchema).all();

  // db.insert(ScenarioSchema)
  // .values({
  //   name: "Third Scenario",
  // })
  // .returning();

  return new Response(JSON.stringify({ scenarios }));
};
