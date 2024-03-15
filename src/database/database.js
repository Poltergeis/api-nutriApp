import mongoose from "mongoose";
import dotenv from 'dotenv';
import signale from "signale";

dotenv.config();

const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DB = process.env.MONGO_DB;

export const connectToMongo = async() => {
    try{
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    }catch(error){
        console.log('error al iniciar la conexion con mongo',error);
        process.exit(0);
    }
}

const conn = mongoose.connection;

conn.once('open', () => {
    signale.info('conexion a mongo establecida');
});

conn.on('error', () => {
    signale.error('la conexion a mongo se ha cerrado debido a un error');
});