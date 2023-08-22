import { Router } from 'express'
import { createGenres, deleteGenre, getAllGenres } from '../controllers/genres.controllers'
import { checkJwtMiddleware } from '../middleware/checkjwt.middleware'

export const genresRoutes = Router()

genresRoutes

    .post('/:moviesId', createGenres)

    .get('/', checkJwtMiddleware, getAllGenres)

    .delete('/:genresId', checkJwtMiddleware, deleteGenre)