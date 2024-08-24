import prisma from "$lib/server/Prisma";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  prisma.soundscape.create({});
};
