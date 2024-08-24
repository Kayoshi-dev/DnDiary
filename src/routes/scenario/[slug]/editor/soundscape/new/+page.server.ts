import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/Prisma";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  try {
    const ambiences = await prisma.ambience.findMany({
      include: {
        category: true,
      },
    });

    return { ambiences };
  } catch (e: unknown) {
    console.log(e);
    error(404, {
      message: "Ambiences not found",
    });
  }
};
