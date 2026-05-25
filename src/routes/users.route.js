import { Router } from "express";
import { db } from "../db/index.js";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.execute(sql`SELECT * from users`);

    res.json({
      success: true,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const [newUser] = await db
      .insert(users)
      .values({ name, email })
      .returning();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    const [updatedUser] = await db
      .update(users)
      .set({ name, email })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
