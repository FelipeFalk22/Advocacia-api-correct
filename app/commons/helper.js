const config = require('../../config.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
console.log('🔐 Chave JWT carregada no middleware:', config.jwt.secret); //usado para ver a chave no postman, remover após teste

exports.hashSenha = (senha) => {
  const hash = crypto.createHash('sha256'); //instancia de Hash
  hash.update(senha); //atualiza o conteudo dele com a senha para processar
  return hash.digest('hex'); //digest = resumo, valor do hash em hexadecimal
};

exports.gerarTokenAcesso = (nome, id) => {
  return jwt.sign({ nome, id }, config.jwt.secret, {
    expiresIn: config.jwt.expiration,
  });
};
