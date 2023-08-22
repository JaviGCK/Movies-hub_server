import { Router } from 'express'
import { createUsers, getAllUsers, getUserById, removeUser, updateUser } from '../controllers/users.controllers'
import { check, uniqueEmail } from '../middleware/check.middleware'

export const usersRoutes = Router()

usersRoutes

    .post('/', createUsers)

    .get('/', getAllUsers)

    .get('/:userId', getUserById)

    .put('/:userId', updateUser)

    .delete('/:userId', removeUser)