import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new Schema({
    name: {
        require: true,
        type: String        
    },
    code: {
        require: true,
        unique: true,
        type: Number,
        index: { unique: true }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function(next){
    const user = this
    if (!user.isModified('password')) {
        return next();
    }
    try {
        
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt)
        
        /*
        bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                user.password = hash
            });
        });*/
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Falló el hash de contraseña');
    }
})

userSchema.methods.comparePassword = async function(clientPassword){
    return await bcryptjs.compare(clientPassword, this.password)
}

export default model('User', userSchema);