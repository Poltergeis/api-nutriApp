import { userModel } from "../models/userModel.js"
import sanitizeHtml from "sanitize-html";

const limpiezaDeCadenas = (data) => {
    for(something in data){
        something = sanitizeHtml(something).trim();
    }
    return data;
}

export const login = async(req,res) => {
    try{

        let {email,password} = req.body;

        ({email,password} = limpiezaDeCadenas({email,password}));

        if((email === '' || !email) || (password === '' || !password)) return res.status(500).send({ loginAllowed:false, message: 'demasiados errores en email o password' });

        const user = await userModel.findOne({ email:email, password:password });
        if(!user) return res.status(404).send({ loginAllowed: false, message: 'el usuario no existe' });

        return res.status(200).send({ loginAllowed: true, user: user, message: 'login permitido' });
    }catch(error){
        return res.status(500).send({ loginAllowed: false, message: 'ha ocurrido un error en el servidor:\n',error });
    }
}

export const postNewUser = async(req,res) => {
    try{
        if(!req.body) return res.status(404).send({ success: false, message: 'no se ha encontrado el cuerpo de la peticion' });

        let {nombre,email,password} = req.body;

        ({nombre,email,password} = limpiezaDeCadenas({nombre,email,password}));

        const newUser = userModel.create({
            nombre: nombre,
            email: email,
            password: password
        });
        if(!newUser) return res.status(400).send({ success: false, message: 'no se ha podido crear el nuevo usuario' });

        return res.status(201).send('usuario creado con exito');
    }catch(error){
        return res.status(500).send({ success: false, message: 'ha ocurrio un error en el servidor' });
    }
}