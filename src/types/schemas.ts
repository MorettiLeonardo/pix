import z from 'zod'

export const transferSchema = z.object({
    payer_id: z.string(),
    payee_id: z.string(),
    amount: z.int().min(1),
    idempotency_key: z.string(),
})

export const getTransferById = z.object({
    id: z.string(),
})
