const router = require("express").Router();
const { db } = require("../db");
const { sql } = require("drizzle-orm");

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

module.exports = router;
