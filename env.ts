import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
});

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `- ${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `Invalid environment variables:\n${details}\n\nCopy .env.example to .env.local and set all required values.`,
  );
}

export const env = parsedEnv.data;
