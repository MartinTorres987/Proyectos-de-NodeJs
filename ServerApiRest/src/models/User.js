import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new Schema({
    name: {
        require: true,
        type: String        
    },
    code: {
        require: true,
        type: Number
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        indez: { unique: true }
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre('save', async function(next){
    const user = this
    if (!user.isModified('´password')) {
        return next();
    }
    try {
        const salt = await bcryptjs.hash(10);
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Falló el hash de contraseña');
    }
})

export default model('User', userSchema);