import { Router } from 'express'
import { createMovie } from "../controllers/movies.controller"

export const moviesRoutes = Router()

moviesRoutes.get('/')

moviesRoutes.get('/:moviesId')

moviesRoutes.post('/:userId', createMovie)

moviesRoutes.put('/:moviesId')

moviesRoutes.delete('/:moviesId')