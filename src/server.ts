import express, { Express } from 'express'
import { gendersRoutes, moviesRoutes, usersRoutes } from './routes'

const morgan = require('morgan')
const helmet = require('helmet')

const app: Express = express()

app.use(morgan('dev'))

app.use(helmet())

app.use(express.json()) 

app.use("/users", usersRoutes)

app.use('/movies', moviesRoutes)

app.use('/genders', gendersRoutes)

export default app