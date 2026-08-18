import { Queue } from "bullmq";

import { redis } from "../redis/redist.connection";

export const transferQueue = new Queue('transfer-queue', {
  connection: redis
})

transferQueue.on("error", (error) => {
  console.log(`Queue [transfer-queue] Error: ${error}`)
})

console.log(`Queue [transfer-queue] init`)
