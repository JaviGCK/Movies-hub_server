import express, { Express } from 'express'
import { userRoutes } from './routes/user.routes'

const app: Express = express()

app.use(express.json()) 

app.use("/user", userRoutes)

export default app