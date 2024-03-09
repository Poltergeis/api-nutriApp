const helmet = require("helmet");
const cors = require('cors');
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const signale = require('signale');
const mongoConn = require('./src/database/database');

const port = process.env.PORT;
 
dotenv.config();

const corsOptions = {
    origin: ['http://localhost:3000']
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

const server = http.createServer(app);

mongoConn.connectToDatabase().then(() => {
    server.listen(port, () => {
        signale.success('api running');
    });
});