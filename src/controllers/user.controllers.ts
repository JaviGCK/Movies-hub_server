import { Request, Response } from "express"

export const getAllUser = (req: Request, res: Response) => {
    res.status(200).send("Get all user")
}

export const createUser = (req: Request, res: Response) => {
    res.status(200).send("User created")
}

export const updateUser = (req: Request, res: Response) => {
    res.status(200).send("User update")
}

export const deleteUser = (req: Request, res: Response) => {
    res.status(200).send("User delate")
}