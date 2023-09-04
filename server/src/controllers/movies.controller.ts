import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";
import { converToType } from '../helpers/utils'
import { uploadImage } from '../helpers/cloudinary'


export const createMovie = async (req: Request, res: Response) => {
    const { name, score } = req.body;
    const { userId } = req.params;
    console.log(req.files);

    try {

        if ((req.files as any)?.url) {
            const upload = await uploadImage((req.files as any).url.tempFilePath);
            const newMovie = await prismaClient.movie.create({
                data: {
                    name: name,
                    url: upload.secure_url,

                    score: parseInt(score),
                    User: {
                        connect: {
                            id: converToType(userId)
                        }
                    }
                }
            });
            res.status(201).json({ message: "Movie created succecfully" });
        } else res.status(404).send('No user found')
    }
    catch (err) {
        console.error("Error creating movie:", err);
        res.status(500).json({ err: "An error occurred while creating movie." });
    }
}



export const getAllMovies = async (req: Request, res: Response) => {

    try {

        const movies = await prismaClient.movie.findMany()

        res.status(201).send(movies)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const { name } = req.body
    const { movieId } = req.params;

    try {

        const movie = await prismaClient.movie.findUnique({

            where: {
                id: converToType(movieId)
            }, include: {
                genres: {
                    select: name
                }
            }
        })

        res.status(200).send(movie);

    } catch (error) {

        res.status(500).send(error)
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { name, score } = req.body;

    try {

        console.log(req.params);
        console.log(req.body);
        if (req.files && req.files.url) {
            const upload = await uploadImage((req.files as any).url.tempFilePath);
            const updatedMovie = await prismaClient.movie.update({
                where: {
                    id: converToType(movieId)
                },
                data: {
                    name: name,
                    url: upload.secure_url,
                    score: converToType(score),
                }
            });

            return res.status(200).json({ message: "Movie updated successfully" });
        } else {
            return res.status(404).json({ error: "No movie found" });
        }
    } catch (err) {
        console.error("Error updating movie:", err);
        return res.status(500).json({ error: "An error occurred while updating movie." });
    }
};



export const removeMovies = async (req: Request, res: Response) => {

    try {

        await prismaClient.movie.deleteMany()

        res.status(204).send('All Movies has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}

export const removeMovieById = async (req: Request, res: Response) => {
    const { name } = req.body
    const { movieId } = req.params;

    try {

        await prismaClient.movie.delete({

            where: {
                id: converToType(movieId)
            },
            include: {
                genres: {
                    select: name
                }
            }
        })

        res.status(204).send('Movie has been deleted')

    } catch (error) {

        res.status(500).send(error)
    }

}
