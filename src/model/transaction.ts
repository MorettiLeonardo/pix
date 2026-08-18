import { transfer_status } from '../../prisma/generated/prisma/enums'

export class Transaction {
    private amount: number
    private failure_reason?: string | null | undefined
    private idempotency_key: string
    private payee_id: string
    private payer_id: string
    private status: transfer_status

    constructor(
        amount: number,
        idempotency_key: string,
        payee_id: string,
        payer_id: string,
        status: transfer_status,
        failure_reason?: string | null
    ) {
        this.amount = amount
        this.failure_reason = failure_reason
        this.idempotency_key = idempotency_key
        this.payee_id = payee_id
        this.payer_id = payer_id
        this.status = status
    }

    getAmount(): number {
        return this.amount
    }

    getFailureReason(): string | null {
        return this.failure_reason ?? null
    }

    getIdempotencyKey(): string {
        return this.idempotency_key
    }

    getPayeeId(): string {
        return this.payee_id
    }

    getPayerId(): string {
        return this.payer_id
    }

    getStatus(): transfer_status {
        return this.status
    }

    markAsFailed() {
        this.status = transfer_status.FAILED
    }

    markAsCompleted() {
        this.status = transfer_status.COMPLETED
    }
}
