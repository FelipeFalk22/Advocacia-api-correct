require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa a configuração Swagger

const app = express();

// --- PRE-CONFIGURAÇÃO ---
app.use(express.json());
app.use(cors({ origin: '*' }));

// --- BANCO DE DADOS ---
const conexao = require('./app/models'); // Importa a configuração do banco de dados

// --- DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROTAS ---
app.get('/', (req, res) => {
  res.json({
    message: 'Advocacia API',
    version: '1.0',
  });
});

const advogadoRotas = require('./app/routes/advogado.routes.js');
const usuarioRotas = require('./app/routes/usuario.routes.js');
app.use('/advogados', advogadoRotas);
app.use('/', usuarioRotas);

// --- SERVIDOR ---
app.listen(config.port, () => {
  console.log(`Servidor online na porta ${config.port}`);
  console.log(`Documentação Swagger: http://localhost:${config.port}/api-docs`);
});
