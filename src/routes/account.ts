import { Router, type Request, type Response } from 'express'

import { prisma } from '../prisma/prisma'

export const accountsRouter = Router()

accountsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const account = await prisma.accounts.create({
            data: {
                balance: 100,
            },
        })

        return res.status(201).send(account)
    } catch (error) {
        console.log(error)
    }
})
