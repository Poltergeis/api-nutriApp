import citaModel from "../models/citasModel.js";

export const postCita = async(req,res) => {
    try{
        const data = req.body;
        const newCita = await citaModel.create({
            nombre: data.nombre,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            edad: data.edad,
            motivo: data.motivo,
            fecha: data.fecha
        });

        if(!newCita) return res.status(400).send('no se ha podido crear la nueva cita');

        await newCita.save();
        return res.status(201).send({ message: 'nueva cita guardada', cita: newCita });
    }catch(error){
        return res.status(500).send('error',error);
    }
}

export const getCitas = async(req,res) => {
    try{

        const citas = await citaModel.find();
        if(!citas) return res.status(404).send({message:'no se ha encontrado la cita',found:false});
        return res.status(200).send({ message: 'citas encontradas', found: true, citas:citas });
        
    }catch(error){
        return res.status(500).send({message:'error',error,found:false});
    }
}

export const getCitaById = async(req,res) => {
    try{
        const {_id} = req.body;
        if(!_id) return res.status(404).send({ message: 'peticion defectuosa, faltan datos', found: false });
        const cita = await citaModel.findById(_id);
        if(!cita) return res.status(404).send({ message: 'cita no encontrada', found:false });
        return res.status(200).send({ message: 'cita encontrada', found: true, cita: cita });
    }catch(error){
        return res.status(500).send({ message: 'cita no encontrada',error,found:false });
    }
}

export const modifyCitaById = async(req,res) => {
    try{
        const { _id } = req.body;
        if(!_id) return res.status(404).send({ message: 'peticion incompleta o dañada', updated:false });
        const { nuevoNombre, nuevoApellidoPat, nuevoApellidoMat, nuevaFecha, nuevoMotivo } = req.body;
        if((!nuevoNombre || !nuevoApellidoPat) || ((!nuevoApellidoMat || !nuevaFecha) || !nuevoMotivo)) return res.status(404).send({ message: 'peticion incompleta, faltan los datos nuevos', updated: false });

        return res.status(200).send({ message: 'cita actualizada', updated: true });
    }catch(error){
        return res.status(500).send({ message: 'error',error, updated: false });
    }
}