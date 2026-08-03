import express from "express"
import colors from 'colors'
import router from "./router"
import db from "./config/db"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

// Conection data base
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        //console.log(colors.blue('Conexion Exitosa a la BD'))
    } catch (error) {
        console.log(colors.red('Error al conectar la BD'))
        console.log(error)
    }

}

connectDB()

// Instacia de Express
const server = express()

// Permitir conexiones
const cordsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null,true)
        }else{
            callback(new Error("Error en CORS"))
        }
    }
}

server.use(cors(cordsOptions))

// Leer Datos de Formularios
server.use(express.json())

server.use(morgan("dev"))

// URL DE LAS RUTAS
server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server
