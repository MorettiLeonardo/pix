import { Queue } from "bullmq";

import { redis } from "../redis/redist.connection";

export const transferQueue = new Queue('transfer-queue', {
  connection: redis
})

transferQueue.on("error", (error) => {
  console.log(`Error on transferQueue: ${error}`)
})
