const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Advogado {
  #nome;
  #oab;
  #especialidade;

  constructor() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get oab() {
    return this.#oab;
  }
  set oab(oab) {
    this.#oab = oab;
  }

  get especialidade() {
    return this.#especialidade;
  }
  set especialidade(esp) {
    this.#especialidade = esp;
  }

  // Buscar advogado pelo ID
  static async findByPk(id) {
    try {
      const resultado = await AdvogadoModel.findByPk(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Listar todos os advogados (com seus processos, se houver associação)
  static async findAll(processo) {
    try {
      const resultados = await AdvogadoModel.findAll({ include: processo });
      if (resultados) {
        return resultados;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Criar novo advogado
  static async create(novoAdvogado) {
    try {
      const advogado = await AdvogadoModel.create({
        nome: novoAdvogado.nome,
        oab: novoAdvogado.oab,
        especialidade: novoAdvogado.especialidade,
      });
      return advogado;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar advogado
  static async update(dados, idAdvogado) {
    try {
      const resultado = await AdvogadoModel.update(dados, { where: { id: idAdvogado } });

      console.log('update model', resultado);
      if (resultado) {
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Excluir advogado
  static async delete(id) {
    try {
      const data = await AdvogadoModel.findByPk(id);
      if (data) {
        await data.destroy();
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
const AdvogadoModel = db.define('advogado', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  oab: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true,
  },
  especialidade: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = { Advogado, AdvogadoModel };

