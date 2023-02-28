import { Router } from 'express';
import consultaRealizadaController from '../controllers/consultaRealizadaController';

const router = new Router();

router.get('/', consultaRealizadaController.index);
router.post('/', consultaRealizadaController.store);
 router.get('/:id', consultaRealizadaController.show); // Lista usuário
 router.delete('/',  consultaRealizadaController.delete);

export default router;
