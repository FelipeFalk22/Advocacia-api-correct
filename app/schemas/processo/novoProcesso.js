module.exports = {
  type: 'object',
  properties: {
    numero_processo: { type: 'string', minLength: 3 },
    descricao: { type: 'string', minLength: 3 },
    status: {
      type: 'string',
      enum: ['em andamento', 'arquivado', 'finalizado']
    }
  },
  required: ['numero_processo', 'descricao', 'status'],
  additionalProperties: false
};
