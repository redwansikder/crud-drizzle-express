// const { Pool } = require("pg");

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   max: Number(process.env.DB_POOL_MAX || 10),
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// pool.on("connect", () => {
//   console.log("PostgreSQL connected");
// });

// pool.on("error", (err) => {
//   console.error("Unexpected PostgreSQL error", err);
//   process.exit(1);
// });

// module.exports = pool;

const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool);

module.exports = { db, pool };
