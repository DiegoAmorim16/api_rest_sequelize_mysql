import { Router } from 'express';
import precoConsultasController from '../controllers/precoConsultasController';

const router = new Router();

router.get('/', precoConsultasController.index);
router.post('/', precoConsultasController.store);
router.post('/', precoConsultasController.store);
router.get('/:id', precoConsultasController.show); // 

export default router;
