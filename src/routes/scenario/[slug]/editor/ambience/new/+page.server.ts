import { getUniqueFilename } from "$lib/utils/string";
import { error, fail } from "@sveltejs/kit";
import { writeFileSync } from "fs";
import type { Actions, PageServerLoad } from "./$types";
import { AmbienceUploadSchema } from "$lib/validation/AmbienceValidator";
import prisma from "$lib/server/Prisma";

export const load: PageServerLoad = async () => {
  try {
    const categories = await prisma.category.findMany();

    return { categories };
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

    const parsedValues = AmbienceUploadSchema.safeParse(formData);

    if (parsedValues.success === false) {
      parsedValues.error.errors.forEach((error) => {
        console.error(error.message);
      });

      return fail(400, {
        error: true,
        message: "Incorrect values",
      });
    }

    const uniqueFilename = getUniqueFilename(
      parsedValues.data.fileToUpload.name
    );

    try {
      writeFileSync(
        `static/upload/${uniqueFilename}`,
        Buffer.from(await parsedValues.data.fileToUpload.arrayBuffer())
      );

      await prisma.ambience.create({
        data: {
          name: parsedValues.data.name,
          description: parsedValues.data.description,
          path: `/upload/${uniqueFilename}`,
          category: {
            connectOrCreate: {
              where: {
                name: parsedValues.data.category,
              },
              create: {
                name: parsedValues.data.category,
              },
            },
          },
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error writing file:", e.message);
      } else {
        console.error("Unknown error:", e);
      }
      return fail(500, {
        error: true,
        message: "Failed to write file",
      });
    }

    return {
      success: true,
    };
  },
} satisfies Actions;
