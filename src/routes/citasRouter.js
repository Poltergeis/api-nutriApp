import express from 'express';
import { postCita } from '../controllers/citasController.js';
import { getCitas } from '../controllers/citasController.js';
import { getCitaById } from '../controllers/citasController.js';
import { modifyCitaById } from '../controllers/citasController.js';

export const citasRouter = express.Router();

citasRouter.post('/newCita', async(req,res) => {
    try{
        await postCita(req,res);
    }catch(error){
        console.log('Error:',error);
    }
});

citasRouter.post('/getCitas', async(req,res) => {
    try{
        await getCitas(req,res);
    }catch(error){
        console.log('Error:',error);
    }
});

citasRouter.put('/modCita', async(req,res) => {
    try{
        await modifyCitaById(req,res);
    }catch(error){
        console.log('Error:',error);
    }
});

citasRouter.post('/getCita', async(req,res) => {
    try{
        await getCitaById(req,res);
    }catch(error){
        console.log('Error:',error);
    }
});