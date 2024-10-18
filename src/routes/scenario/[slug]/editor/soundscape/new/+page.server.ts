import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/Prisma";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const ambiences = await prisma.ambience.findMany({
      include: {
        category: true,
      },
    });

    const scenario = await prisma.scenario.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        chapters: true,
      },
    });

    return { ambiences, scenario };
  } catch (e: unknown) {
    console.log(e);
    error(404, {
      message: "Ambiences not found",
    });
  }
};
