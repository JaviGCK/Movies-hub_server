import { Router } from 'express'
import { createUsers, getAllUsers, getUserById, removeUser, updateUser } from '../controllers/users.controllers'
import { check } from '../middleware/check.middleware'

export const usersRoutes = Router()

usersRoutes.post('/', check, createUsers)

usersRoutes.get('/', getAllUsers)

usersRoutes.get('/:userId', getUserById)

usersRoutes.put('/:userId', updateUser)

usersRoutes.delete('/:userId', removeUser)