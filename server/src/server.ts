import express, { Express } from 'express'
import { genresRoutes, moviesRoutes, scoreRoutes, usersRoutes } from './routes'
import cors from 'cors';
const morgan = require('morgan')
const helmet = require('helmet')

const app: Express = express()

app.use(morgan('dev'))

app.use(helmet())

app.use(express.json())

app.use(cors());

app.use('/users', usersRoutes)

app.use('/movies', moviesRoutes)

app.use('/score', scoreRoutes)

app.use('/genres', genresRoutes)

export default app