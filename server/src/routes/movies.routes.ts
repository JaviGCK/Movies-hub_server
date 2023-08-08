import { Router } from 'express'
import { createMovies, deleteMovies, getAllMovies, getMoviesById, updateMovies } from '../controllers/movies.controllers'

export const moviesRoutes = Router()

moviesRoutes.get('/', getAllMovies)

moviesRoutes.get('/:moviesId', getMoviesById)

moviesRoutes.post('/:userId', createMovies)

moviesRoutes.put('/:moviesId', updateMovies)

moviesRoutes.delete('/:moviesId', deleteMovies)