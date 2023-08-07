import { Request, Response } from 'express'
import UserModel from '../model/user.model'

export const createUsers = async (req: Request, res: Response) => {
    const { name, email, password, movies } = req.body

    try { 

        if(!name || !email || !password) {
            res.status(400).send('Missing required fileds')
            return
        }

       const newUser = await UserModel.create({
            name,
            email,
            password,
            movies
        })

        res.status(201).send(newUser)
    } catch(error){
        res.status(500).send(error)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        
        const allUser = await UserModel.find()

        res.status(201).send(allUser)

    } catch (error){
        res.status(500).send(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const {userId} = req.params
    try {

        const user = await UserModel.findById({_id: userId}).populate('movies')

        res.status(201).send(user)

    } catch (error){
        res.status(500).send(error )
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    const {userId} = req.params
    const {name} = req.body
    try {

        const user = await UserModel.findByIdAndUpdate({_id: userId}, 
            {$set: {name: name}
        }, {new: true})

        res.status(200).send(user)

    } catch (error){
        res.status(500).send(error)
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const {userId} = req.params
    try {

        const user = await UserModel.findByIdAndDelete({_id: userId})

        res.status(204).send()

    } catch (error) {
        res.status(500).send(error)
    }
    }