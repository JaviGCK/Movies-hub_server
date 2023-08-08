import { Request, Response } from "express";
import MoviesModel from "../model/movies.model";
import UserModel from "../model/user.model";

export const createMovies = async (req: Request, res: Response) => {
    const {name, poster_image, score, genre} = req.body
    const {userId} = req.params

    try { 

        if(!name || !score) {
            res.status(400).send('Missing required fileds')
            return
        }
        const newMovie = await MoviesModel.create({
            name,
            poster_image,
            score,
            genre
        })

         await UserModel.findByIdAndUpdate({_id: userId}, {
            $push: {movies:  newMovie._id}
        }, {new: true})

        res.status(201).send(newMovie)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllMovies = async  (req: Request, res:Response) => {
    try {
        
        const allUser = await UserModel.find()

        res.status(201).send(allUser)

    } catch (error){
        res.status(500).send(error)
    }
}

export const getMoviesById = async (req: Request, res: Response) => {
    const {moviesId} = req.params
    try {

        const movies = await MoviesModel.findById({_id: moviesId}).populate('movies')

        res.status(201).send(movies)

    } catch (error){
        res.status(500).send(error)
    }
}

export const updateMovies = async (req: Request, res: Response) => {
    const {moviesId} = req.params
    const {score} = req.body
    try {

        const movie = await MoviesModel.findByIdAndUpdate({_id: moviesId}, 
            {$set: {score: score}
        }, {new: true})

        res.status(200).send(movie)

    } catch (error){
        res.status(500).send(error)
    }
}

export const deleteMovies = async (req: Request, res: Response) => {
    const {moviesId} = req.params
    try {

        await MoviesModel.findByIdAndDelete({_id: moviesId})

        res.status(200).send('Movie has been deleted')
    } catch (error) {
        res.status(500).send(error)
    }
}