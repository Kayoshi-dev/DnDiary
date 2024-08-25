import { z } from "zod";

export const SoundscapeValidator = z.object({
  name: z.string().min(1, { message: "Name must have a value" }).max(30),
  description: z
    .string()
    .min(3, { message: "Description must have a value" })
    .max(300)
    .optional(),
  ambiences: z.string({ message: "Ambiences must have a value" }),
  chapter: z.string({ message: "Chapter must have a value" }),
  image: z.instanceof(File, { message: "Image must have a value" }),
});
