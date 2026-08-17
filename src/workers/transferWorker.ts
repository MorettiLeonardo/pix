import { Job, Worker } from 'bullmq'

const workerTransfer = new Worker('transfer-queue', async (job: Job) => {
  return "WORKER DEU BOA SE PA"
})
