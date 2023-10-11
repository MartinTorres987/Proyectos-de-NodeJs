import { Schema, model } from "mongoose";

const CarreraSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    numberSubjects: {
        type: Number,
        require: true,
        default: 0
    },
    inscriptions: {
        type: Number,
        default: 0
    }
})

export default model('Carrera', CarreraSchema)