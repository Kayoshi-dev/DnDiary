import { z } from "zod";

export const AmbienceUploadSchema = z.object({
  name: z.string().min(1, { message: "Name must have a value" }).max(30),
  description: z
    .string()
    .min(3, { message: "Description must have a value" })
    .max(300)
    .optional(),
  category: z
    .string()
    .min(1, { message: "Category must have a value" })
    .max(20),
  fileToUpload: z.instanceof(File, { message: "File must have a value" }),
});
