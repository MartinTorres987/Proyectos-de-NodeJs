import Carrera from "../models/Carrera"

const gettingCarreers = async (req, res) =>{
    // codigo
    const carreras = await Carrera.find()
    res.json(carreras)
}

const creatingCarreer = async (req, res) =>{
    // codigo
    const { name, falculty, numberSubjects } = req.body;

    const newCareer = Carrera({
        name,
        falculty,
        numberSubjects
    })

    await newCareer.save();
    
    res.json(newCareer)   
}

const updatingCarreer = async (req, res) =>{
    // codigo
}
const deletingCarreer = async (req, res) =>{
    // codigo
}

export {
    gettingCarreers,
    creatingCarreer,
    updatingCarreer,
    deletingCarreer
}