import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3333").transform(Number),
  FRONTEND_URL: z.string().url().default("http://localhost:4200"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      throw new Error(`❌ Invalid environment variables:\n${messages.join("\n")}`);
    }
    throw error;
  }
}
