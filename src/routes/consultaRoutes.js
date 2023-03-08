import { Router } from 'express';
import consultaController from '../controllers/consultaController';
import isAdmin from '../middlewares/isAdmin';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, isAdmin, consultaController.index);
router.post('/', consultaController.store);

export default router;
