declare global {
  namespace NodeJS {
    interface processEnv {
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      FRONTEND_URL?: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
