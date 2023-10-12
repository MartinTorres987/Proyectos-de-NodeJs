import { Router } from "express";
import { gettingCarreers, creatingCarreer} from "../../controllers/carreersController";

const router = Router();

router.get('/carreras', gettingCarreers);
router.post('/carreras', creatingCarreer);

export default router;