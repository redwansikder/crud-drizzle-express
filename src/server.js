const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

let server;

async function startServer() {
  try {
    await db.query("SELECT 1");

    console.log("Database connected");

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully...`);

  try {
    if (server) {
      server.close(() => {
        console.log("HTTP server closed");
      });
    }

    await db.end();

    console.log("Database pool closed");

    process.exit(0);
  } catch (error) {
    console.error("Shutdown error", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
