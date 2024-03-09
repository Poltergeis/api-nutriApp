const mongoose = require('mongoose');
const signale = require('signale');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const DB = process.env.DB;
const MONGO_PORT = process.env.MONGO_PORT;


mongoConn = {
    connectToDatabase : async() => {
        try{
            await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB}`);
        }catch(error){
            signale.error('mongo connection error', error);
        }
    }
}

module.exports = mongoConn;

const conn = mongoose.connection;

conn.once('open', () => {
    signale.info('mongo is listening');
});

conn.on('error', () => {
    signale.error('mongo connection closed by an error');
});