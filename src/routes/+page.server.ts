import type { ScenarioType } from "$db/scenario";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`/api/scenarios`);
  const { scenarios }: { scenarios: ScenarioType[] } = await res.json();

  return { scenarios };
};
