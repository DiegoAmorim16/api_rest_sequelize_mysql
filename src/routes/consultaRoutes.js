import { Router } from 'express';
import consultaController from '../controllers/consultaController';

const router = new Router();

router.get('/', consultaController.index);
router.post('/', consultaController.store);

export default router;
