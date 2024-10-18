import { z } from "zod";
import type { AmbienceMixer } from "$lib/store/SoundMixer";

const AmbienceSchema: z.ZodType<AmbienceMixer> = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  path: z.string(),
  categoryId: z.string(),

  loop: z.boolean(),
  volume: z.number().min(0).max(1),
});

export const SoundscapeValidator = z.object({
  name: z.string().min(1, { message: "Name must have a value" }).max(30),
  description: z
    .string()
    .min(3, { message: "Description must have a value" })
    .max(300)
    .optional(),
  ambiences: z.array(AmbienceSchema),
  chapter: z.string({ message: "Chapter must have a value" }),
  // image: z.instanceof(File, { message: "Image must have a value" }),
});
