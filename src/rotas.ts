import usuarioController from "./usuarios/usuario.controller.js";
import produtoController from "./produtos/produtos.controller.js";

import { Router } from "express";

const router = Router();

//criando rotas para os usuários
router.post('/usuarios', usuarioController.adicionar);
router.get('/usuarios', usuarioController.listar);

router.post('/produtos', produtoController.adicionar);
router.get('/produtos', produtoController.listar);

export default router;