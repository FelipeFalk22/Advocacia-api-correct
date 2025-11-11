// validação de schema
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/advogado/novoAdvogado.js');
const validacao = ajv.compile(schema);

// models
const models = require('../models');
const Advogado = models.advogado.AdvogadoModel;
const ProcessoModel = models.processo.ProcessoModel; 


class AdvogadoController {
  // Listar todos os advogados
  findAll(request, response) {
    Advogado.findAll({
      include: [{ model: ProcessoModel, as: 'processos' }],
    })
      .then((data) => {
        if (data && data.length > 0) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Nenhum advogado encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Buscar advogado por ID
  find(request, response) {
    const id = request.params.id;

    Advogado.findByPk(id, {
      include: [{ model: ProcessoModel, as: 'processos' }],
    })
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'advogado não encontrado',
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Criar novo advogado
  create(request, response) {
    let validacoes = validacao(request.body);

    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    Advogado.create(request.body)
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'erro no servidor: ' + erro.message,
        });
      });
  }

  // Atualizar advogado
  update(request, response) {
    const id = request.params.id;

    Advogado.findByPk(id)
      .then((buscaAdvogado) => {
        if (buscaAdvogado === null) {
          return response.status(404).json({
            message: 'advogado não encontrado',
          });
        } else {
          Advogado.update(request.body, { where: { id } })
            .then((resultado) => {
              if (resultado[0] > 0) {
                Advogado.findByPk(id).then((advogadoAtualizado) => {
                  return response.status(200).json(advogadoAtualizado);
                });
              } else {
                return response.status(500).json({
                  message: 'ocorreu algum problema no servidor',
                });
              }
            })
            .catch((erro) => {
              return response.status(500).json({
                message: erro.message,
              });
            });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Excluir advogado
  delete(request, response) {
    const id = request.params.id;

    Advogado.destroy({ where: { id } })
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'advogado excluído com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'advogado não encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }
}

module.exports = new AdvogadoController();
