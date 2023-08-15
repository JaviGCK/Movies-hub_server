import { Router } from 'express'
import { createScore, deleteScore, getAllScore } from '../controllers/score.controller'

export const scoreRoutes = Router()

scoreRoutes

    .post('/:moviesId', createScore)

    .get('/', getAllScore)

    .delete('/:genresId', deleteScore)