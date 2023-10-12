import { Router } from "express"
import { gettingCarreers } from "../../controllers/carreersController";

const router = Router()

router.get('/', (req, res) =>{
    res.send('Hello Word')
});

export default router;