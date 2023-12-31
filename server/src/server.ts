import express, { Express } from 'express';
import { genresRoutes, moviesRoutes, usersRoutes } from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import fileUpload from 'express-fileupload'
import { checkJwt } from './middleware/checkjwt.middleware';

const app: Express = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


app.use(express.json());
app.use('/users', checkJwt, usersRoutes);
app.use('/movies', checkJwt, moviesRoutes);
app.use('/genres', genresRoutes);

export default app