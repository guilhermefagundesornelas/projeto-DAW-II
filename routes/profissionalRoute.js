import express from 'express';
const router = express.Router();
//Busca o profissionalController
import profissionalController from '../controllers/profissionalController.js'
const controle = new profissionalController();

const caminhobase = 'profissional/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
export default router
