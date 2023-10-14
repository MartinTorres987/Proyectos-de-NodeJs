import User from "../models/User";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/managerToken";

export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        let user = await User.findOne({email});

        if (!user) return res.status(403).json({error: "Las creedencias no son correctas"})

        // Comparar password
        const confirmPassword = await user.comparePassword(password);

        if (!confirmPassword) {
            return res.status(403).json({error: "La contraseña es incorrecta"})
        }

        // Generar jwt token
        const { token, expiresIn } = generateToken(user._id);

        res.json( { token, expiresIn });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error de Servidor"})
    }
}

export const register = async (req, res) =>{ 
    const { name, email, password, code } = req.body;

    try {
        // validad si ya existe el usaurio por email
        let user = await User.findOne({email});

        if(user) throw ({code: 11000});
        
        user = new User({
            name,
            code,
            email,
            password
        });

        await user.save();

        return res.status(201).json({
            "Nuevo Usuario" : user
        })
    } catch (error) {
        console.error(error)
        // alternativa  por defecto mongoose
        if (error.code === 11000) {
           return res.status(400).json({'error': 'El Usuario ya existe'}) 
        }
        res.status(400).json({error : "Error al crear el usuario"})
    }
    res.json({ok: true });
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();

        res.json({ name: user.name, email: user.email, uid: user._id  })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
   
}