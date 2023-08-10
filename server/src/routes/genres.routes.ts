import { Router } from 'express'
import { createGenres, deleteGenre } from '../controllers/genres.controllers'

export const genresRoutes = Router()

genresRoutes.post('/:moviesId', createGenres)

genresRoutes.delete('/:genresId', deleteGenre)