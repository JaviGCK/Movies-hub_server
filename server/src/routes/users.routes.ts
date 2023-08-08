import { Router } from 'express'
import { createUsers, deleteUsers, getAllUsers, getUserById, updateUsers } from '../controllers/users.controllers'
import { check } from '../middleware/check.middleware'

export const usersRoutes = Router()

usersRoutes.post('/', check, createUsers)

usersRoutes.get('/', getAllUsers)

usersRoutes.get('/:userId', getUserById)

usersRoutes.put('/:userId', updateUsers)

usersRoutes.delete('/:userId', deleteUsers)