import Redis from "ioredis";

const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redisClient;
