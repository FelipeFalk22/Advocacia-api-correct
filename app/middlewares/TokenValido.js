const jwt = require('jsonwebtoken');
const config = require('../../config.js');

class TokenValido {
  async check(request, response, next) {
    const cabecalhoAuth = request.headers['authorization'];

    // 🧩 LOGS DE DEBUG
    console.log('🔍 Token recebido no header:', cabecalhoAuth);
    console.log('🔍 Segredo JWT usado para verificar:', config.jwt.secret);

    // Se nenhum cabeçalho de autenticação foi fornecido:
    if (!cabecalhoAuth) {
      return response.status(401).json({
        message: 'Sem autorização: o cabeçalho Authorization não foi fornecido.',
      });
    }

    // Se o cabeçalho não começa com "Bearer"
    if (!cabecalhoAuth.startsWith('Bearer')) {
      return response.status(401).json({
        message: 'Mecanismo de autenticação inválido. Utilize o formato: Bearer [token].',
      });
    }

    const token = cabecalhoAuth.split(' ')[1];

    // Se o cabeçalho foi fornecido mas o token não:
    if (!token) {
      return response.status(401).json({
        message: 'Token JWT não fornecido no cabeçalho Authorization.',
      });
    }

    // Verifica validade do token JWT
    jwt.verify(token, config.jwt.secret, (erro, usuarioData) => {
      console.log('📦 Payload decodificado:', usuarioData);
      console.log('⚠️ Erro JWT:', erro ? erro.message : 'nenhum');

      if (erro) {
        return response.status(403).json({
          message: 'Token inválido ou expirado. Realize o login novamente.',
        });
      }

      next();
    });
  }
}

module.exports = new TokenValido();
