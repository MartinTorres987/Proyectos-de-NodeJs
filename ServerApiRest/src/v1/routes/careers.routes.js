import { Router } from "express";
import { getCarreers, getOneCarreer, createCarreer, deleteCarreer, updateCarreer } from "../../controllers/carreersController";

const router = Router();
// get
router.get('/carreras', getCarreers);
router.get('/carreras/:id', getOneCarreer);
// post
router.post('/carreras', createCarreer);
// update
router.put('/carreras/:id', updateCarreer);
// delate
router.delete('/carreras/:id', deleteCarreer);

export default router;