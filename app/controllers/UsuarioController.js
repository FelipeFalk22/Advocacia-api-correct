const models = require('../models');
const Usuario = models.usuario.Usuario;
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // habilita validação de formato (email, date, etc.)
const schema = require('../schemas/usuario/novoUsuario.js');
const validacao = ajv.compile(schema);
const helper = require('../commons/helper.js');
const schemaLogin = require('../schemas/usuario/login.js');
const validacaoLogin = ajv.compile(schemaLogin);

class UsuarioController {
  // Criação de um novo usuário
  create(request, response) {
    const validacoes = validacao(request.body);
    if (!validacoes) {
      const erro = validacao.errors[0];
      const campo = erro.instancePath.replace('/', '') || 'campo';
      const mensagem = `${campo} ${erro.message}`;
      return response.status(400).json({ message: mensagem });
    }

    const usuario = {
      nome: request.body.nome || null,
      email: request.body.email,
      senha: helper.hashSenha(request.body.senha),
    };

    Usuario.create(usuario)
      .then((data) => {
        data.setDataValue('senha', '');
        data.setDataValue('token', helper.gerarTokenAcesso(usuario.nome, usuario.id));
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({ message: erro.message });
      });
  }

  // Login do usuário
  login(request, response) {
    const validacoes = validacaoLogin(request.body);
    if (!validacoes) {
      const erro = validacaoLogin.errors[0];
      const campo = erro.instancePath.replace('/', '') || 'campo';
      const mensagem = `${campo} ${erro.message}`;
      return response.status(400).json({ message: mensagem });
    }

    const dados = {
      email: request.body.email,
      senha: helper.hashSenha(request.body.senha), // Criptografa a senha recebida
    };

   Usuario.findOne({ email: dados.email, senha: dados.senha })
      .then((registro) => {
        if (!registro) {
          return response.status(404).json({
            message: 'Usuário ou senha não encontrados.',
          });
        }

        // Gera token JWT
        return response.status(200).json({
          token: helper.gerarTokenAcesso(registro.nome, registro.id),
        });
      })
      .catch((erro) => {
        return response.status(500).json({ message: erro.message });
      });
  }
}

module.exports = new UsuarioController();
