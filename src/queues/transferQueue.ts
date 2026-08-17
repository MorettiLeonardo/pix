import { Queue } from "bullmq";

export const transferQueue = new Queue('transfer-queue')

transferQueue.on("error", (error) => {
  console.log(`Error on transferQueue: ${error}`)
})
