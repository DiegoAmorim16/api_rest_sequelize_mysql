import { Router } from 'express';
import novaConsultaController from '../controllers/novaConsultaController';
import loginRequired from '../middlewares/loginRequired';

//import loginRequired from '../middlewares/loginRequired';
//import isAdmin from '../middlewares/isAdmin';
const router = new Router();

router.post('/:id', loginRequired, novaConsultaController.store);

export default router;
