import "dotenv/config"
import IORedis from "ioredis";

export const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null
})

redis.on("connect", () => {
  console.log("Redis connected")
})

redis.on("error", (error) => {
  console.error("Redis error:", error)
})
