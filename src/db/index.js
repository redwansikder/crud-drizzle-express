import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Standardizing to a single connection string prevents connection mismatches
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
