import express,{ Router } from "express";
import { login,postNewUser } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.use(express.json());

const avgErrMessage = 'error al consultar la ruta de la peticion:';

userRouter.post('/login', async(req,res) => {
    try{
        await login(req,res);//se que login deberia ser un metodo get, pero al hacer get el email y la contraseña se muestran en la ruta,
        //asi que los he puesto en un post para tener acceso a un cuerpo de la peticion
    }catch(error){
        console.log(avgErrMessage,error);
    }
});

userRouter.post('/postNewUser', async(req,res) => {
    try{
        await postNewUser(req,res);
    }catch(error){
        console.log(avgErrMessage,error);
    }
});