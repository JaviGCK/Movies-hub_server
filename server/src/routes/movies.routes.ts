import { Router } from 'express'
import { createMovies, deleteMovies, getAllMovies, updateMovies } from '../controllers/movies.controllers'

export const moviesRoutes = Router()

moviesRoutes.get('/', getAllMovies)

moviesRoutes.post('/:userId', createMovies)

moviesRoutes.put('/:moviesID', updateMovies)

moviesRoutes.delete('/:moviesID', deleteMovies)