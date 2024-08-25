import type { PageServerLoad, Actions } from "./$types";
import prisma from "$lib/server/Prisma";
import { error, fail } from "@sveltejs/kit";
import { writeFileSync } from "fs";
import { getUniqueFilename } from "$lib/utils/string";
import { SoundscapeValidator } from "$lib/validation/SoundscapeValidator";

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

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const parsedSoundscape = SoundscapeValidator.safeParse(formData);

    if (parsedSoundscape.success === false) {
      parsedSoundscape.error.errors.forEach((error) => {
        console.error(error.message);
      });

      return fail(400, {
        error: true,
        message: "Incorrect values",
      });
    }

    const ambienceIds = parsedSoundscape.data.ambiences.split(",");

    const uniqueSoundscapeImage = getUniqueFilename(
      parsedSoundscape.data?.image.name
    );

    console.log("formdata", formData);

    try {
      writeFileSync(
        `static/upload/icons/${uniqueSoundscapeImage}`,
        Buffer.from(await parsedSoundscape.data.image.arrayBuffer())
      );

      await prisma.soundscape.create({
        data: {
          name: parsedSoundscape.data.name,
          description: parsedSoundscape.data.description,
          chapters: {
            create: {
              chapterId: parsedSoundscape.data.chapter,
            },
          },
          ambiences: {
            create: ambienceIds.map((ambienceId) => ({
              ambience: {
                connect: { id: ambienceId },
              },
            })),
          },
          iconPath: `/upload/icons/${uniqueSoundscapeImage}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
} satisfies Actions;
