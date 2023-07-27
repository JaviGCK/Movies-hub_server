import express, {Request, Response} from 'express'
import { userRoutes } from './routes/user.routes'
import config from "./config/config"

const app = express()
app.use(express.json())  

const PORT = config.app.PORT

app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})