import { Job, Worker } from 'bullmq'

import { Transaction } from '../model/transaction'
import { redis } from '../redis/redist.connection'
import { prisma } from '../prisma/prisma'

const workerTransfer = new Worker('transfer-queue', async (job: Job) => {
  console.error(`WORKER [transfer-queue] Job ${job.id} init`)

  if (!job.data) {
    console.error(`WORKER [transfer-queue] data is missing`)
    throw new Error("Job data is missing")
  }

  const {
    amount,
    failure_reason,
    idempotency_key,
    payee_id,
    payer_id,
    status
  } = job.data

  const transaction = new Transaction(amount, failure_reason, idempotency_key, payee_id, payer_id, status)

  await prisma.transactions.create({
    data: {
      amount: transaction.getAmount(),
      idempotency_key: transaction.getIdempotencyKey(),
      payee_id: transaction.getPayeeId(),
      payer_id: transaction.getPayerId(),
      status: transaction.getStatus(),
    }
  })

  console.error(`WORKER [transfer-queue] Job ${job.id} finish`)
},
  { connection: redis }
)

workerTransfer.on("error", (error: Error) => {
  console.error(
    `WORKER [transfer-queue] Error`,
    error
  )
})

workerTransfer.on("failed", (job, error) => {
  console.error(
    `WORKER [transfer-queue] Job ${job?.id} failed`,
    error
  )
})

workerTransfer.on("completed", (job) => {
  console.error(    `WORKER [transfer-queue] Job ${job?.id} processed`)
})

console.log("WORKER [transfer-queue] started")
