import type { Scenario } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`/api/scenarios`);
  const { scenarios }: { scenarios: Scenario[] } = await res.json();

  return { scenarios };
};
