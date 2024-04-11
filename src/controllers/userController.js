import { userModel } from "../models/userModel.js"
import sanitizeHtml from "sanitize-html";

const limpiezaDeCadenas = (something) => {
    something = sanitizeHtml(something).trim();
    return something;
}

export const login = async(req,res) => {
    try{

        let {email,password} = req.body;

        email = limpiezaDeCadenas(email);
        password = limpiezaDeCadenas(password);

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
        let {nombre,email,password} = req.body;

        const newUser = userModel.create({
            nombre: nombre,
            email: email,
            password: password
        });
        if(!newUser) return res.status(400).send({ success: false, message: 'no se ha podido crear el nuevo usuario' });

        return res.status(201).send({message: 'usuario creado con exito', success: true, newUser: {
            nombre: nombre,
            email: email,
            password: password
        }});
    }catch(error){
        return res.status(500).send({ success: false, message: 'ha ocurrio un error en el servidor' });
    }
}

export const updateProfile = async(req,res) => {
    try{
        const data = req.body;
        let {nombre,apellidoPaterno,apellidoMaterno} = data;
        const params = req.params;

        nombre = limpiezaDeCadenas(nombre);
        apellidoPaterno = limpiezaDeCadenas(apellidoPaterno);
        apellidoMaterno = limpiezaDeCadenas(apellidoMaterno);

        const user = await userModel.findById(params._id);

        if(!user) return res.status(404).send('usuario no encontrado');

        await user.updateOne({ nombre: nombre + " " + apellidoPaterno + " " + apellidoMaterno });

        return await res.status(200).send({ message: 'usuario actualizado con exito', user: await userModel.findById(params._id) });

    }catch(error){
        console.log('ERROR:',error);
        return res.status(500).send(error);
    }
}