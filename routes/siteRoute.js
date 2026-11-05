import express from 'express';
const router = express.Router();
import siteController from '../controllers/siteController.js'
const controle = new siteController();


const caminhobase = 'site/'

router.get('/' + caminhobase , controle.index)
router.get('/' + caminhobase + 'servicos', controle.servicos)
router.get('/' + caminhobase + 'categorias', controle.categorias)
router.get('/' + caminhobase + 'carrinho', controle.carrinho)
router.post('/' + caminhobase + 'carrinho', controle.carrinho)
router.get('/' + caminhobase + 'contratacoes', controle.contratacoes)
export default router
