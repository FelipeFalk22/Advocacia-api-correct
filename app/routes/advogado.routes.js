const express = require('express');
var router = express.Router();
const advogadoController = require('../controllers/AdvogadoController.js');
const processoController = require('../controllers/ProcessoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

// ===============================
// ADVOGADOS
// ===============================

// Retorna todos os advogados
router.get('/', [authMiddleware.check], advogadoController.findAll);
/**
 * @swagger
 * /advogados:
 *   get:
 *     summary: Lista todos os advogados
 *     description: Retorna uma lista com todos os advogados e seus respectivos processos.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de advogados retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advogado'
 *       '401':
 *         description: Não autorizado.
 */

// Recupera um advogado pelo seu ID
router.get('/:id', [authMiddleware.check], advogadoController.find);
/**
 * @swagger
 * /advogados/{id}:
 *   get:
 *     summary: Recupera um advogado pelo seu ID
 *     description: Busca e retorna os dados de um advogado específico.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Dados do advogado retornados com sucesso.
 *       '404':
 *         description: Advogado não encontrado.
 */

// Cria um novo advogado
router.post('/', [authMiddleware.check], advogadoController.create);
/**
 * @swagger
 * /advogados:
 *   post:
 *     summary: Cadastra um novo advogado
 *     description: Adiciona um novo advogado ao sistema.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoAdvogado'
 *     responses:
 *       '201':
 *         description: Advogado criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */

// Atualiza um advogado pelo seu ID
router.put('/:id', [authMiddleware.check], advogadoController.update);
/**
 * @swagger
 * /advogados/{id}:
 *   put:
 *     summary: Atualiza um advogado
 *     description: Atualiza os dados de um advogado específico.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advogado'
 *     responses:
 *       '200':
 *         description: Advogado atualizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 *       '404':
 *         description: Advogado não encontrado.
 */

// Exclui um advogado
router.delete('/:id', [authMiddleware.check], advogadoController.delete);
/**
 * @swagger
 * /advogados/{id}:
 *   delete:
 *     summary: Exclui um advogado
 *     description: Remove um advogado do sistema (somente se não houver processos associados).
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Advogado excluído com sucesso.
 *       '404':
 *         description: Advogado não encontrado.
 */

// ===============================
// PROCESSOS (VINCULADOS A ADVOGADOS)
// ===============================

// Lista todos os processos de um advogado
router.get('/:id_advogado/processos', [authMiddleware.check], processoController.findByAdvogado);
/**
 * @swagger
 * /advogados/{id_advogado}/processos:
 *   get:
 *     summary: Lista todos os processos de um advogado
 *     description: Retorna todos os processos associados a um advogado específico.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do advogado.
 *     responses:
 *       '200':
 *         description: Lista de processos retornada com sucesso.
 *       '404':
 *         description: Advogado não encontrado.
 */

// Cria um novo processo para um advogado
router.post('/:id_advogado/processos', [authMiddleware.check], processoController.create);
/**
 * @swagger
 * /advogados/{id_advogado}/processos:
 *   post:
 *     summary: Cria um novo processo para um advogado
 *     description: Adiciona um novo processo e o associa a um advogado existente.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoProcesso'
 *     responses:
 *       '201':
 *         description: Processo criado e associado ao advogado.
 *       '400':
 *         description: Dados inválidos.
 */

// Atualiza um processo de um advogado
router.put('/:id_advogado/processos/:id_processo', [authMiddleware.check], processoController.update);
/**
 * @swagger
 * /advogados/{id_advogado}/processos/{id_processo}:
 *   put:
 *     summary: Atualiza um processo
 *     description: Atualiza as informações de um processo específico vinculado a um advogado.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Processo'
 *     responses:
 *       '200':
 *         description: Processo atualizado com sucesso.
 *       '404':
 *         description: Processo ou advogado não encontrado.
 */

// Exclui um processo de um advogado
router.delete('/:id_advogado/processos/:id_processo', [authMiddleware.check], processoController.delete);
/**
 * @swagger
 * /advogados/{id_advogado}/processos/{id_processo}:
 *   delete:
 *     summary: Exclui um processo
 *     description: Remove um processo vinculado a um advogado.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Processo excluído com sucesso.
 *       '404':
 *         description: Processo não encontrado.
 */

module.exports = router;
