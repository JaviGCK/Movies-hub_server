import dotenv from "../../../server/node_modules/dotenv/lib/main"

type TConfig = { 
    [key: string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig
    db: MongoDBConfig
}

type AppConfig = {
    PORT: string | number
}

type MongoDBConfig = {
    URI: string
}

if(process.env.NODE_ENV === 'production') {
    dotenv.config({path:  '.env.production'})
} else {
    dotenv.config({path: 'DOTENV_KEY.env.development'})
}

const ENV = process.env.NODE_ENV ?? "development"

const CONFIG: TConfig  = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test_development' 
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002 
        },
        db: {
            URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test_ development' 
        }
    }
}

export default CONFIG[ENV]