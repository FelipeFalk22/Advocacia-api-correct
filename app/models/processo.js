const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Processo {
  #numero_processo;
  #descricao;
  #status;

  constructor() {}

  get numero_processo() {
    return this.#numero_processo;
  }
  set numero_processo(numero) {
    this.#numero_processo = numero;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(desc) {
    this.#descricao = desc;
  }

  get status() {
    return this.#status;
  }
  set status(stat) {
    this.#status = stat;
  }

  // Busca todos os processos de um advogado
  static findAllByAdvogadoId(id_advogado) {
    return ProcessoModel.findAll({ where: { id_advogado } });
  }

  // Cria um novo processo
  static create(novoProcesso) {
    return ProcessoModel.create(novoProcesso);
  }

  // Atualiza um processo específico de um advogado
  static update(dados, id_advogado, id_processo) {
    return ProcessoModel.update(dados, {
      where: { id: id_processo, id_advogado: id_advogado },
    });
  }

  // Busca um processo específico
  static findOne(id_advogado, id_processo) {
    return ProcessoModel.findOne({ where: { id: id_processo, id_advogado: id_advogado } });
  }

  // Exclui um processo específico
  static async delete(id_processo, id_advogado) {
    try {
      const processo = await ProcessoModel.findOne({
        where: { id: id_processo, id_advogado: id_advogado },
      });

      if (processo) {
        await processo.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

// Modelo Sequelize (estrutura da tabela)
const ProcessoModel = db.define('processo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_advogado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numero_processo: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
});

module.exports = { Processo, ProcessoModel };
