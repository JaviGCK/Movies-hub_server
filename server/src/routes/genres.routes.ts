import { Router } from 'express'
import { createGenres, deleteGenders } from '../controllers/genres.controllers'

export const gendersRoutes = Router()

gendersRoutes.post('/:moviesId', createGenres)

gendersRoutes.delete('/:genresId', deleteGenders)