import { Router } from 'express'
import { createScore, deleteScore, deleteScoreById, getAllScore, updateScore } from '../controllers/score.controller'

import { checkJwtMiddleware } from '../middleware/checkjwt.middleware'

export const scoreRoutes = Router()

scoreRoutes

    .post('/:moviesId', createScore)

    .get('/', getAllScore)

    .put("/:scoreId", checkJwtMiddleware, updateScore)

    .delete('/:scoreId', checkJwtMiddleware, deleteScoreById)

    .delete('/', checkJwtMiddleware, deleteScore)