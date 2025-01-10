import type { RequestHandler } from "./$types";
import prisma from "$lib/server/Prisma";
import { json } from "@sveltejs/kit";
import { writeFileSync } from "fs";
// import { getUniqueFilename } from "$lib/utils/string";
import { SoundscapeValidator } from "$lib/validation/SoundscapeValidator";
import type { AmbienceMixer } from "$lib/store/SoundMixer";
import { getUniqueFilename } from "$lib/utils/string";

// Insert a new soundscape
export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();

  const soundscapeValues = Object.fromEntries(formData) as unknown as Omit<
    {
      name: string;
      id: string;
      description: string | null;
      iconPath: string | null;
    },
    "id" | "iconPath"
  > & {
    chapter: string | undefined;
    ambiences: AmbienceMixer[];
  };

  soundscapeValues.ambiences = JSON.parse(
    soundscapeValues.ambiences as unknown as string
  );

  const parsedSoundscape = SoundscapeValidator.safeParse(soundscapeValues);

  if (parsedSoundscape.success === false) {
    parsedSoundscape.error.errors.forEach((error) => {
      console.error(error.message);
    });

    return new Response(
      JSON.stringify({
        error: true,
        message: "Incorrect values",
      }),
      { status: 400 }
    );
  }

  const uniqueSoundscapeImage = getUniqueFilename(
    parsedSoundscape.data?.image.name
  );

  try {
    writeFileSync(
      `static/upload/icons/${uniqueSoundscapeImage}`,
      Buffer.from(await parsedSoundscape.data.image.arrayBuffer())
    );

    const newSoundscape = await prisma.soundscape.create({
      data: {
        name: parsedSoundscape.data.name,
        description: parsedSoundscape.data.description,
        chapters: {
          create: {
            chapterId: parsedSoundscape.data.chapter,
          },
        },
        ambiences: {
          create: parsedSoundscape.data.ambiences.map((ambience) => ({
            loop: ambience.loop,
            volume: ambience.volume,
            ambience: {
              connect: { id: ambience.id },
            },
          })),
        },
        // iconPath: `/upload/icons/${uniqueSoundscapeImage}`,
        iconPath: `/upload/icons/${uniqueSoundscapeImage}`,
      },
    });

    console.log(`
      SUCCESS
      `);

    return json(newSoundscape);
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
};
