import express from "express"
import colors from 'colors'
import router from "./router"
import db from "./config/db"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Conection data base
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        //console.log(colors.blue('Conexion Exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red('Error al conectar la BD'))
    }

}

connectDB()

// Instacia de Express
const server = express()

// Leer Datos de Formularios
server.use(express.json())

// URL DE LAS RUTAS
server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server
