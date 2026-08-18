import { Router, type Request, type Response } from 'express'

import { getTransferById, transferSchema } from '../types/schemas'
import { transfer_status } from '../../prisma/generated/prisma/enums'
import { transferQueue } from '../queues/transfer.queue'
import { prisma } from '../prisma/prisma'

export const transferRoutes = Router()

transferRoutes.post('/', async (req: Request, res: Response) => {
    const parsedData = transferSchema.safeParse(req.body)

    if (!parsedData.success) {
        throw new Error(`Error to parse data ${parsedData.error}`)
    }

    const { payer_id, payee_id, amount, idempotency_key } = parsedData.data

    try {
        const data = {
            amount,
            idempotency_key,
            payee_id,
            payer_id,
            status: transfer_status.PENDING,
        }

        await transferQueue.add('transfer-queue', data)

        return res.status(201).send({ status: data.status })
    } catch (error) {
        console.log(`Error on transfer: ${error}`)
    }
})

transferRoutes.get('/:id', async (req: Request, res: Response) => {
    try {
        const parsedData = getTransferById.safeParse(req.params)

        if (!parsedData.success) {
            throw new Error(`Error to parse data ${parsedData.error}`)
        }

        const { id } = parsedData.data

        const transfer = await prisma.transactions.findFirst({
            where: {
                id,
            },
        })

        return res.status(200).send(transfer)
    } catch (error) {}
})
