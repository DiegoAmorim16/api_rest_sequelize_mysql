import { Router } from 'express';
import consultaRealizadaController from '../controllers/consultaRealizadaController';
//import loginRequired from '../middlewares/loginRequired';
//import isAdmin from '../middlewares/isAdmin';
const router = new Router();

router.get('/', consultaRealizadaController.index);
router.post('/', consultaRealizadaController.store);
router.get('/:id', consultaRealizadaController.show); // Lista usuário
router.delete('/', consultaRealizadaController.delete);
router.get('/stats/:id', consultaRealizadaController.count);
export default router;
