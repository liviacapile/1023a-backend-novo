import usuarioController from "./usuarios/usuario.controller";

import { Router } from "express";

const router = Router();

//criando rotas para os usuários
router.post('/usuarios', usuarioController.adicionar);
router.get('/usuarios', usuarioController.listar);

export default router;