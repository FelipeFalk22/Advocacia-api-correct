module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4 },
    email: { type: 'string'},
    senha: { type: 'string', minLength: 6 }
  },
  required: ['email', 'senha', 'nome'],
  additionalProperties: false
};
