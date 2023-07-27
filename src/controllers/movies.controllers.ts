import { Request, Response } from "express";

export const getAllMovies = (req: Request, res:Response) => {
    res.status(200).send('Get all movies')
}

export const createMovies = (req: Request, res: Response) => {
    res.status(200).send('Movie created')
}

export const updateMovies = (req: Request, res: Response) => {
    res.status(200).send('Movie update')
}

export const deleteMovies = (req: Request, res: Response) => {
    res.status(200).send('Movie delete')
}