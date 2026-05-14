import { Router } from "express";
import { db } from "../db/index.js";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.execute(sql`SELECT NOW()`);

    res.json({
      success: true,
      dbTime: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
    });
  }
});

export default router;
