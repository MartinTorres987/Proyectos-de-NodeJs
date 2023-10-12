import Carrera from "../models/Carrera"

export const getCarreers = async (req, res) => {
    // codigo
    const carreras = await Carrera.find()
    res.json(carreras)
}

export const getOneCarreer = async (req, res) => {
    // codigo
    try {
        const carreraID = req.params.id;

        const carrera = await Carrera.findById(carreraID);

        return res.json(carrera)

    } catch (error) {
        return res.status(404).json({
            message: "Carrer doesn't found"
        })
    }
}

export const createCarreer = async (req, res) => {
    // codigo
    try {
        const { name, faculty, numberSubjects } = req.body;

        const newCareer = Carrera({
            name,
            faculty,
            numberSubjects
        })

        await newCareer.save();

        res.json(newCareer)
    } catch (error) {
        res.json({
            messageError: error
        })
    }

}

export const updateCarreer = async (req, res) => {
    const { id } = req.params;

    const careerUpdated = await Carrera.findByIdAndUpdate(id, req.body, { new: true })
    return res.json({
        message: "Actualizando Carrera",
        carrer: careerUpdated
    })
}

export const deleteCarreer = async (req, res) => {
    try {
        const carreraId = req.params.id;

        const carreraDeleted = await Carrera.findByIdAndDelete(carreraId)

        res.json(carreraDeleted);
    } catch (error) {
        return res.status(404).json({
            message: "Carrer doesn't found"
        })
    }
}