import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 15000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : false
    }
})

export default db

