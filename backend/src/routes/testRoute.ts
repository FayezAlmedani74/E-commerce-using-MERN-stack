// routes/testRoute.ts
import { Router } from "express";
import redisClient from "../utils/redisClient";

const router = Router();

// Test route to set a key-value pair in Redis
router.get("/set", async (req, res) => {
  try {
    await redisClient.set("sampleKey", "sampleValue");
    res.send("sampleKey set with sampleValue");
  } catch (err) {
    res.status(500).send("Error setting key in Redis");
  }
});

// Test route to get a value by key from Redis
router.get("/get", async (req, res) => {
  try {
    const value = await redisClient.get("sampleKey");
    res.send(`Value for sampleKey: ${value}`);
  } catch (err) {
    res.status(500).send("Error getting key from Redis");
  }
});

// Test route to set a key with expiration
router.get("/set-expiring", async (req, res) => {
  try {
    await redisClient.set("tempKey", "tempValue", "EX", 60); // Expires in 60 seconds
    res.send("tempKey set with tempValue for 60 seconds");
  } catch (err) {
    res.status(500).send("Error setting expiring key in Redis");
  }
});

// Test route to delete a key in Redis
router.get("/delete", async (req, res) => {
  try {
    await redisClient.del("sampleKey");
    res.send("sampleKey deleted");
  } catch (err) {
    res.status(500).send("Error deleting key in Redis");
  }
});

export default router;
