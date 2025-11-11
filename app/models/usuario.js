const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Usuario {
  #nome;
  #email;
  #senha;

  constructor() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }

  get senha() {
    return this.#senha;
  }
  set senha(senha) {
    this.#senha = senha;
  }

  // Cria um novo usuário no banco
  static async create(novoUsuario) {
    try {
      const usuario = await UsuarioModel.create({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  // Busca um usuário
  static async findOne(dados) {
    try {
      const resultado = await UsuarioModel.findOne({ where: dados });
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

// Modelo Sequelize (estrutura da tabela)
const UsuarioModel = db.define('usuario', {
  nome: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(80),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
});

module.exports = { Usuario, UsuarioModel };
