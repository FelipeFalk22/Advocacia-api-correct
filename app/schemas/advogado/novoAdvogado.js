module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 3 },
    oab: { type: 'string', minLength: 4 },
    especialidade: { type: 'string', minLength: 3 }
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false
};
