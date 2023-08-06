import app from "./server"
import config from "./config/config"
import connect from "./db/connect"

const PORT = config.app.PORT

connect().then( async function onServerStart() {
    console.log("Connected from database")

    app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`);
    })  
})

