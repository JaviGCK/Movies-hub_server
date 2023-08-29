import express, { Express } from 'express';
import { genresRoutes, moviesRoutes, usersRoutes } from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { checkJwt } from './middleware/checkJwt.middleware'
const app: Express = express();

app.use(morgan('dev'));
app.use(helmet());


app.use(cors());

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);

export default app;
