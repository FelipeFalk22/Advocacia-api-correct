const conexao = require('./conexao.js');
const advogado = require('./Advogado.js');
const processo = require('./Processo.js');
const usuario = require('./Usuario.js');
const relations = require('./relations.js');

const db = {};

// Importa e guarda os models
db.advogado = advogado;
db.processo = processo;
db.usuario = usuario;

// Passa os Models Sequelize reais para relations.js
relations({
  AdvogadoModel: advogado.AdvogadoModel,
  ProcessoModel: processo.ProcessoModel,
});

// Sincroniza banco
conexao
  .sync({})
  .then(() => {
    console.log('Sincronização com o banco de dados realizada com sucesso...');
  })
  .catch((err) => {
    console.log('Falha ao sincronizar com o banco de dados: ' + err.message);
  });

module.exports = db;

