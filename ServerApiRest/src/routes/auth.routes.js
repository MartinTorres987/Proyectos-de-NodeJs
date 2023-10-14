import { Router } from "express";
import { login, register, infoUser } from "../controllers/authController";
import { body } from "express-validator";
import { validationRequest } from "../middlewares/validationRequest";
import { requireToken } from "../middlewares/requiereToken";

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
        body('name', 'Debes agregar un nombre y un apellido').notEmpty().isString(),
        body('email', "El Correo es inválido").trim().isEmail().normalizeEmail(),
        body('code', 'Has olvidado tu código').notEmpty(),
        body('code', 'El código es inválido').isNumeric().isLength({ min: 8}),
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

router.get("/protected", requireToken, infoUser)

export default router;