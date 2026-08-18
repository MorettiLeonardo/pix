import express, { Router } from 'express'
import type { Request, Response } from 'express'

import { accountsRouter } from './routes/account'
import { transferRoutes } from './routes/transfer'

const app = express()

app.use(express.json())

export const route = Router()

app.use(route)
app.use("/accounts", accountsRouter)
app.use("/transfers", transferRoutes)

route.get("/health", (req: Request, res: Response) => {
  res.send({ "health": "ok" })
})

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3333")
})
