import express, { Express } from 'express'
import { usersRoutes } from './routes/users.routes'
import { moviesRoutes } from './routes/movies.routes'
import { gendersRoutes } from './routes/genders.routes'

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