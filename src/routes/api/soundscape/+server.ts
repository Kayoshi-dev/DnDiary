import type { RequestHandler } from "./$types";
import prisma from "$lib/server/Prisma";
import { json } from "@sveltejs/kit";
// import { writeFileSync } from "fs";
// import { getUniqueFilename } from "$lib/utils/string";
import { SoundscapeValidator } from "$lib/validation/SoundscapeValidator";

// Insert a new soundscape
export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.json();

  const parsedSoundscape = SoundscapeValidator.safeParse(formData);

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

  // const uniqueSoundscapeImage = getUniqueFilename(
  //   parsedSoundscape.data?.image.name
  // );

  console.log("formdata", formData);

  try {
    // writeFileSync(
    //   `static/upload/icons/${uniqueSoundscapeImage}`,
    //   Buffer.from(await parsedSoundscape.data.image.arrayBuffer())
    // );

    const x = await prisma.soundscape.create({
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
        iconPath: `/upload/icons/test`,
      },
    });

    console.log(`
      SUCCESS
      `);

    return json(x);
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
