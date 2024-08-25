import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/Prisma";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const scenario = await prisma.scenario.findFirstOrThrow({
      where: {
        slug: params.slug,
      },
    });

    const chapters = await prisma.chapter.findMany({
      where: {
        scenarioId: scenario.id,
      },
      include: {
        soundscapes: {
          include: {
            soundscape: true,
          },
        },
      },
    });

    return { scenario, chapters };
  } catch (e: unknown) {
    console.log(e);
    error(404, {
      message: "Scenario not found",
    });
  }
};
