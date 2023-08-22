import { Router } from 'express';
import { checkJwtMiddleware } from '../middleware/checkjwt.middleware';
import { createMovie, getAllMovies, getMovieById, removeMovies, removeMovieById, updateMovie } from '../controllers/movies.controller';

export const moviesRoutes = Router();

moviesRoutes
    .post('/', createMovie)
    .get('/', getAllMovies)
    .get('/:movieId', checkJwtMiddleware, getMovieById)
    .put('/:movieId', checkJwtMiddleware, updateMovie)
    .delete('/', checkJwtMiddleware, removeMovies)
    .delete('/:movieId', checkJwtMiddleware, removeMovieById);
