import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/Prisma";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const scenario = await prisma.scenario.findFirstOrThrow({
      include: {
        chapters: true,
      },
      where: {
        slug: params.slug,
      },
    });

    return { scenario };
  } catch (e: unknown) {
    console.log(e);
    error(404, {
      message: "Scenario not found",
    });
  }
};
