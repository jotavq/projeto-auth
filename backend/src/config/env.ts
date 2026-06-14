import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "PORT",
] as const;

interface Env {
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  PORT: string;
  FRONTEND_URL?: string;
}

const validateEnv = (): Env => {
  const missing: string[] = [];

  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Variaveis de ambiente Faltando: ${missing.join(", ")}`);
  }

  return {
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
    PORT: process.env.PORT!,
    FRONTEND_URL: process.env.FRONTEND_URL,
  };
};

export const env = validateEnv();
