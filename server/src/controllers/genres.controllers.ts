import { Request, Response } from "express";
import GenreModel from "../model/genres.model";
import MoviesModel from "../model/movies.model";

export const createGenres = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { moviesId } = req.params;
    try {
        const newGenre = await GenreModel.create({
            name
        });

        await MoviesModel.findByIdAndUpdate({_id: moviesId}, {
            $push: { genres: newGenre._id }
        }, { new: true });

        res.status(200).send(newGenre);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const deleteGenders = async (req: Request, res: Response) => {
    const {genresId} = req.params

    try{

        await GenreModel.findByIdAndDelete({_id: genresId})

        res.status(200).send('Gender has been deleted')
        
    } catch (error) {
        res.status(500).send(error)
    }
}