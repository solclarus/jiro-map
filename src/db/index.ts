import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "@/db/schemas/auth";
import * as recordSchema from "@/db/schemas/record";

config({ path: ".env" });

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({
  client,
  schema: { ...authSchema, ...recordSchema },
});
