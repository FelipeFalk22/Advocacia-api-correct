const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advocacia API - Sistema de Gestão de Advogados e Processos',
      version: '1.0.0',
      description: 'Documentação da API RESTful para gerenciamento de advogados, processos e autenticação de usuários.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token no formato: Bearer [seu_token]',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do usuário', example: 1 },
            nome: { type: 'string', description: 'Nome completo do usuário', example: 'João da Silva' },
            email: { type: 'string', description: 'E-mail do usuário', example: 'joao@ifsc.edu.br' },
            senha: { type: 'string', description: 'Senha criptografada', example: '$2b$10$abc123...' },
          },
        },
        NovoUsuario: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', description: 'Nome do novo usuário', example: 'João da Silva' },
            email: { type: 'string', description: 'E-mail de login', example: 'joao@ifsc.edu.br' },
            senha: { type: 'string', description: 'Senha em texto plano', example: '123456' },
          },
        },
        LoginUsuario: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', description: 'E-mail do usuário', example: 'joao@ifsc.edu.br' },
            senha: { type: 'string', description: 'Senha do usuário', example: '123456' },
          },
        },
        Advogado: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do advogado', example: 1 },
            nome: { type: 'string', description: 'Nome do advogado', example: 'Dr. Carlos Pereira' },
            oab: { type: 'string', description: 'Número de registro OAB', example: 'SC12345' },
            especialidade: { type: 'string', description: 'Área de atuação', example: 'Direito Civil' },
          },
        },
        NovoAdvogado: {
          type: 'object',
          required: ['nome', 'oab', 'especialidade'],
          properties: {
            nome: { type: 'string', description: 'Nome completo do advogado', example: 'Dra. Maria Costa' },
            oab: { type: 'string', description: 'Número da OAB', example: 'SC98765' },
            especialidade: { type: 'string', description: 'Especialidade jurídica', example: 'Direito Penal' },
          },
        },
        Processo: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do processo', example: 1 },
            numero_processo: { type: 'string', description: 'Número único do processo', example: '0001234-56.2025.8.24.0001' },
            descricao: { type: 'string', description: 'Descrição ou resumo do processo', example: 'Ação de indenização por danos morais' },
            status: { type: 'string', description: 'Situação atual do processo', example: 'Em andamento' },
            id_advogado: { type: 'integer', description: 'ID do advogado responsável', example: 2 },
          },
        },
        NovoProcesso: {
          type: 'object',
          required: ['numero_processo', 'descricao', 'status'],
          properties: {
            numero_processo: { type: 'string', description: 'Número do processo', example: '0001234-56.2025.8.24.0001' },
            descricao: { type: 'string', description: 'Descrição detalhada do processo', example: 'Processo civil por inadimplência contratual' },
            status: { type: 'string', description: 'Status atual', example: 'Arquivado' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    
  },
  apis: ['./app/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
