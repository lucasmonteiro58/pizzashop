import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_ENABLE_DELAY: z
    .string()
    .default("true")
    .transform((val) => val === "true"),
  MODE: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(import.meta.env);
