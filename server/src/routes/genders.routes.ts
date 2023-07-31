import { Router } from 'express'
import { createGenders, deleteGenders, getAllGenders, updateGenders } from '../controllers/genders.controllers'

export const gendersRoutes = Router()

gendersRoutes.get('/', getAllGenders)

gendersRoutes.post('/', createGenders)

gendersRoutes.put('/:genderID', updateGenders)

gendersRoutes.delete('/:genderID', deleteGenders)