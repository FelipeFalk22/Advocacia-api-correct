const config = require('../../config.js');
const dbconfig = config.dbconfig;
const Sequelize = require('sequelize');

// Criação da conexão com o banco de dados MySQL
const conexao = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.passwd, {
  host: dbconfig.host,
  dialect: dbconfig.dialect,
  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
  define: {
    underscored: dbconfig.define.underscored,
    freezeTableName: dbconfig.define.freezeTableName,
    timestamps: dbconfig.define.timestamps,
    paranoid: dbconfig.define.paranoid,
  },
  dialectOptions: {
    dateStrings: false, // desabilita o uso de datetime e timestamp como objetos Date do JS
    typeCast: function (field, next) {
      // leitura de campos DATETIME
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  timezone: '-03:00',
});

// Testando a conexão
(async () => {
  try {
    await conexao.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso.');
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados:', error);
  }
})();

module.exports = conexao;
