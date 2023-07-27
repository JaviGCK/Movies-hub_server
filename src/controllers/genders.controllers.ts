import { Request, Response } from "express";

export const getAllGenders = (req: Request, res: Response) => {
    res.status(200).send('Get all genders')
}

export const createGenders = (req: Request, res: Response) => {
    res.status(200).send('Gender created')
}

export const updateGenders = (req: Request, res: Response) => {
    res.status(200).send('Gender update')
}

export const deleteGenders = (req: Request, res: Response) => {
    res.status(200).send('Gender delete')
}