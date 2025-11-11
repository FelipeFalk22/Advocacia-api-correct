const express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/UsuarioController.js');

// Rota de criação de usuário
router.post('/usuario', usuarioController.create);
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um usuário
 *     description: Cadastra um novo usuário (funcionário do escritório) no sistema e retorna um token JWT.
 *     tags: [usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 *       '500':
 *         description: Erro interno no servidor.
 */

// Rota de login
router.post('/usuario/login', usuarioController.login);
/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Faz login de um usuário
 *     description: Autentica o usuário no sistema e retorna um token JWT para acesso às rotas protegidas.
 *     tags: [usuario]
 *     security: []  # desativa autenticação JWT nessa rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 *       '404':
 *         description: Usuário ou senha incorretos.
 *       '500':
 *         description: Erro interno no servidor.
 */

module.exports = router;
