import { configDotenv } from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

configDotenv({ path: envFile });

console.log("Environment loaded:", envFile);