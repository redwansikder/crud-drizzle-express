import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

const db = drizzle(pool);

console.log("Applying migrations...");

// This reads your generated .sql files from your folder
await migrate(db, { migrationsFolder: "./drizzle" });

console.log("Migrations applied successfully!");
await pool.end();
process.exit(0);
