import { Router } from "express";
import { login, register } from "../controllers/authController";
import { body } from "express-validator";
import { validationRequest } from "../middlewares/validationRequest";

const router = Router();

router.post('/login', 
    [
        body('email', "El Correo es inválido").trim().isEmail().normalizeEmail(),
        body('password', "Minimo 6 caraceter").trim().isLength({ min: 6 }),
    ],
    validationRequest,
    login
);

router.post('/register', 
    [
        body('email', "El Correo es inválido").trim().isEmail().normalizeEmail(),
        body('password', "Minimo 6 caraceter").trim()
            .isLength({ min: 6 }),
        body('password', "La contraseña es incorrecta")
            .custom((value, { req }) => {
                if (value !== req.body.passwordConfirm) {
                    throw new Error('Las contraseñas no coinciden')
                }
                return value
            })
    ],
    validationRequest, 
    register
);

export default router;