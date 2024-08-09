import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`/api`);
  const { scenarios } = await res.json();

  console.log(scenarios);

  return { scenarios };
};
