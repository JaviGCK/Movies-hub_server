import { Router } from "express"
import { createUser, deleteUser, getAllUser, updateUser } from "../controllers/user.controllers"

export const userRoutes = Router() 

userRoutes.get("/", getAllUser)

userRoutes.post("/", createUser)

userRoutes.put("/:userID", updateUser) 

userRoutes.delete("/:userID", deleteUser)