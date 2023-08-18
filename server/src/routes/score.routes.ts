import { Router } from 'express'
import { createScore, deleteScore, deleteScoreById, getAllScore, updateScore } from '../controllers/score.controller'

export const scoreRoutes = Router()

scoreRoutes

    .post('/:moviesId', createScore)

    .get('/', getAllScore)

    .put("/:scoreId", updateScore)

    .delete('/:scoreId', deleteScoreById)

    .delete('/', deleteScore)