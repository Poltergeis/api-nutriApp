import express from 'express';
import cors from 'cors';
import signale from 'signale';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';

import { connectToMongo } from './src/database/database.js';

import { userRouter } from './src/routes/userRouter.js';
import { citasRouter } from './src/routes/citasRouter.js';

dotenv.config();

const corsOptions = {
    origin: ['http://localhost:5173']
}

const app = express();

app.use('/user', userRouter);
app.use('/cita', citasRouter);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);

const PORT = process.env.PORT;

(await connectToMongo().then(() => {
    server.listen(PORT, () => {
        signale.info('la api esta funcionando en el puerto: ' + PORT);
    });
}));