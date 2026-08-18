import IORedis from "ioredis";

export const redis = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null
})

redis.on("connect", () => {
  console.log("Redis connected")
})

redis.on("error", (error) => {
  console.error("Redis error:", error)
})
