const models = require('../models');
const { ProcessoModel: Processo } = require('../models/Processo.js');
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/processo/novoProcesso.js');
const validacao = ajv.compile(schema);

class ProcessoController {
// Listar processos de um advogado
findByAdvogado(request, response) {
  const id_advogado = request.params.id_advogado;

  Processo.findAll({ where: { id_advogado } })
    .then((processos) => {
      if (processos && processos.length > 0) {
        return response.status(200).json(processos);
      }
      return response.status(404).json({ message: 'Nenhum processo encontrado para este advogado' });
    })
    .catch((error) => {
      return response.status(500).json({ message: error.message });
    });
}

// Criar processo vinculado a um advogado
create(request, response) {
  let validacoes = validacao(request.body);
  if (!validacoes) {
    let mensagem = validacao.errors[0].instancePath.replace('/', '');
    mensagem += ' ' + validacao.errors[0].message;
    return response.status(400).json({ message: mensagem });
  }

  const processoParaCriar = {
    ...request.body,
    id_advogado: request.params.id_advogado,
  };

  Processo.create(processoParaCriar)
    .then((novoProcesso) => response.status(201).json(novoProcesso))
    .catch((erro) => response.status(500).json({ message: 'erro no servidor: ' + erro.message }));
}

// Atualizar processo de um advogado
update(request, response) {
  const { id_advogado, id_processo } = request.params;

  Processo.update(request.body, { where: { id: id_processo, id_advogado } })
    .then((resultado) => {
      if (resultado[0] > 0) {
        Processo.findOne({ where: { id: id_processo, id_advogado } }).then((data) => {
          response.status(200).json(data);
        });
      } else {
        response.status(404).json({
          message: `Processo com id=${id_processo} não encontrado ou sem alterações.`,
        });
      }
    })
    .catch((err) => response.status(500).json({ message: 'Erro ao atualizar o processo: ' + err.message }));
}

// Excluir processo de um advogado
delete(request, response) {
  const { id_processo, id_advogado } = request.params;

  Processo.destroy({ where: { id: id_processo, id_advogado } })
    .then((removido) => {
      if (removido) {
        return response.status(200).json({ message: 'processo excluído com sucesso' });
      } else {
        return response.status(404).json({ message: 'processo não encontrado' });
      }
    })
    .catch((erro) => {
      response.status(500).json({ message: erro.message });
    });
}
}
module.exports = new ProcessoController(); 