import type { RequestHandler } from "./$types";
import { getRandomId, slugify } from "$lib/utils/string";
import prisma from "$lib/server/Prisma";

// Returns a single result from the database
export const GET: RequestHandler = async () => {
  const generatedId = getRandomId();

  const scenario = await prisma.scenario.create({
    data: {
      title: `Scenario ${generatedId}`,
      slug: slugify(`Scenario ${generatedId}`),
    },
  });

  return new Response(JSON.stringify({ scenario }));
};
