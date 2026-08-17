import express, { Router } from 'express'
import type { Request, Response } from 'express'

import { getTransferById, transferSchema } from './types/schemas'
import { prisma } from './prisma/prisma'
import { transfer_status } from '../prisma/generated/prisma/enums'
import { transferQueue } from './queues/transferQueue'

const app = express()

const route = Router()

app.use(express.json())

app.use(route)

route.get("/health", (req: Request, res: Response) => {
  res.send({ "health": "ok" })
})

route.post("/accounts", async (req: Request, res: Response) => {
  try {
    const account = await prisma.accounts.create({
      data: {
        balance: 100
      }
    })

    return res.status(201).send(account)
  } catch (error) {
    console.log(error)
  }
})

route.post("/transfers", async (req: Request, res: Response) => {
  const parsedData = transferSchema.safeParse(req.body)

  if (!parsedData.success) {
    throw new Error(`Error to parse data ${parsedData.error}`)
  }

  const { payer_id, payee_id, amount, idempotency_key } = parsedData.data

  try {
    const transfer = await prisma.transactions.create({
      data: {
        amount,
        idempotency_key,
        payee_id,
        payer_id,
        status: transfer_status.PENDING,
      }
    })

    await transferQueue.add('transfer-queue', transfer)

    return res.status(201).send({ "status": transfer.status })
  } catch (error) {
    console.log(`Error on transfer: ${error}`)
  }
})

route.get("/transfer/:id", async (req: Request, res: Response) => {
  try {
    const parsedData = getTransferById.safeParse(req.params)

    if (!parsedData.success) {
      throw new Error(`Error to parse data ${parsedData.error}`)
    }

    const { id } = parsedData.data

    const transfer = await prisma.transactions.findFirst({
      where: {
        id
      }
    })

    return res.status(200).send(transfer)
  } catch (error) {

  }
})

app.listen(3333, () => {
  console.log("Server running on port 3333")
})
