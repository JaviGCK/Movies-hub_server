import { Router } from 'express'
import { createUsers, deleteUsers, getAllUsers, updateUsers } from '../controllers/users.controllers'

export const usersRoutes = Router() 

usersRoutes.get('/', getAllUsers)

usersRoutes.post('/', createUsers)

usersRoutes.put('/:userID', updateUsers) 

usersRoutes.delete('/:userID', deleteUsers)