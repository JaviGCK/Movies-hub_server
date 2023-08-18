import express, { Express } from 'express'
import { genresRoutes, moviesRoutes, scoreRoutes, usersRoutes } from './routes'
import cors from 'cors';
import { checkJwtMiddleware } from './middleware/checkjwt.middleware'

const morgan = require('morgan')
const helmet = require('helmet')

const app: Express = express()

app.use(morgan('dev'))

app.use(helmet())

app.use(express.json())

app.use(cors());

app.use('/users', checkJwtMiddleware, usersRoutes)

app.use('/movies', moviesRoutes)

app.use('/score', checkJwtMiddleware, scoreRoutes)

app.use('/genres', checkJwtMiddleware, genresRoutes)

export default app;
