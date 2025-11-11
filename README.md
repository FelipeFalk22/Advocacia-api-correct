# ⚖️ Advocacia API — Sistema de Gestão de Advogados e Processos

API REST desenvolvida em **Node.js + Express + Sequelize (MySQL)** para gerenciamento de **advogados e seus processos**, com autenticação JWT e documentação Swagger.

---

## 📁 Estrutura do Projeto

```
advocacia-api/
│
├── app/
│   ├── controllers/          # Lógica de negócio (Advogado e Processo)
│   ├── middlewares/          # Middleware de autenticação JWT
│   ├── models/               # Definições Sequelize e associações
│   ├── routes/               # Rotas express organizadas
│   ├── schemas/              # Validações de entrada (AJV)
│   └── swaggerConfig.js      # Configuração da documentação Swagger
│
├── node_modules/             # Dependências do projeto
├── .env                      # Variáveis de ambiente (DB, JWT, etc.)
├── app.js                    # Arquivo principal Express
├── package.json              # Dependências e scripts
└── README.md
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **Node.js** (v18 ou superior)
- **MySQL Server** (em execução localmente)
- **npm** (ou **yarn**) para instalar dependências

---

## 🚀 Instalação

1. **Clonar o repositório:**

```bash
git clone https://github.com/FelipeFalk22/advocacia-api.git
cd advocacia-api
```

2. **Instalar as dependências:**

```bash
npm install
```

3. **Criar o arquivo `.env` na raiz do projeto:**

```env
DB_NAME=advocacia_db
DB_USER=root
DB_PASSWORD=suasenha
DB_HOST=localhost
DB_DIALECT=mysql

JWT_SECRET=segredo_super_secreto
PORT=3000
```

4. **Rodar a aplicação:**

```bash
npm start
```
ou, para desenvolvimento:
```bash
npx nodemon app.js
```

---

## 🗄️ Banco de Dados

O Sequelize faz a sincronização automática com o banco configurado.  
Na primeira execução, ele criará as tabelas:

- **advogado**
- **processo**
- **usuario**

### Relações
- Um **advogado** tem vários **processos** (`hasMany`)
- Um **processo** pertence a um **advogado** (`belongsTo`)

---

## 🧩 Documentação Swagger

Após iniciar o servidor, acesse:

👉 **http://localhost:3000/api-docs**

Aqui você pode testar todas as rotas da API diretamente no navegador.

---

## 🔐 Autenticação JWT

As rotas são protegidas por token JWT via middleware `TokenValido.js`.

### Exemplo de requisição protegida:

```bash
GET /advogados
Headers:
Authorization: Bearer <seu_token_jwt>
```

---

## 🧠 Endpoints principais

### 👨‍⚖️ Advogados

| Método | Endpoint              | Descrição                        |
|--------|-----------------------|----------------------------------|
| GET    | /advogados            | Lista todos os advogados         |
| GET    | /advogados/:id        | Retorna um advogado específico   |
| POST   | /advogados            | Cadastra um novo advogado        |
| PUT    | /advogados/:id        | Atualiza um advogado             |
| DELETE | /advogados/:id        | Remove um advogado               |

### 📂 Processos (vinculados ao advogado)

| Método | Endpoint                                       | Descrição                                 |
|--------|------------------------------------------------|-------------------------------------------|
| GET    | /advogados/:id_advogado/processos              | Lista processos de um advogado            |
| POST   | /advogados/:id_advogado/processos              | Cria novo processo para um advogado       |
| PUT    | /advogados/:id_advogado/processos/:id_processo | Atualiza processo vinculado               |
| DELETE | /advogados/:id_advogado/processos/:id_processo | Exclui processo vinculado ao advogado     |

---

## ✅ Validações com AJV

Os schemas de validação estão na pasta `schemas/`.  
Exemplo: `app/schemas/advogado/novoAdvogado.js`

Cada requisição `POST` e `PUT` é validada antes de ir ao banco.

---

## 💾 Conexão com o MySQL

O arquivo `app/models/conexao.js` contém a configuração do Sequelize.

```js
const Sequelize = require('sequelize');

const conexao = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

module.exports = conexao;
```

---

## 🧪 Testando a API

Use o **Postman** com as rotas listadas acima.  
Certifique-se de incluir o token JWT no cabeçalho de autorização.

---

## 🧰 Scripts disponíveis

| Comando | Descrição |
|----------|------------|
| `npm start` | Inicia a API normalmente |
| `npx nodemon app.js` | Inicia a API em modo desenvolvimento (auto reload) |
| `npm install` | Instala todas as dependências |

---

## 🧑‍💻 Tecnologias utilizadas

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- AJV (validação de schema JSON)
- JWT (autenticação)
- Swagger UI (documentação interativa)

---

## 👨‍🎓 Autor

**Felipe Barcelos Rafaeli Falk**  
Projeto desenvolvido para a disciplina de Desenvolvimento Web - Avaliação N2.  
📧 Contato: *lipe91235995@gmail.com*
