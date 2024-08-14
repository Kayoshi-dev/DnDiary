import type { RequestHandler } from "./$types";
import prisma from "$lib/server/Prisma";

export const GET: RequestHandler = async () => {
  // TODO modify and fetch based on the slug
  const scenarios = await prisma.scenario.findMany();

  return new Response(JSON.stringify({ scenarios }));
};
