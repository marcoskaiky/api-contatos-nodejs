# api-contatos-nodejs
Projeto de API de Contatos. Implementa operações CRUD (Create, Read, Update, Delete) com persistência em banco de dados MySQL, incluindo validações de dados essenciais.
API de Contatos - Node.js + TypeScript + MySQL

Requisitos
- Node.js 18+
- MySQL 8+

Configuração
1. Clone o repositório e instale dependências
```
npm install
```

2. Crie o banco de dados no MySQL
```
CREATE DATABASE api_contatos;
```

3. Crie o arquivo .env na raiz do projeto
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=api_contatos
NODE_ENV=development
PORT=3000
```

4. Execute as migrations
```
npm run migrate:latest
```

Executar em desenvolvimento
```
npm run dev
```
Servidor padrão: http://localhost:3000

Endpoints
- POST /contatos
  - Body JSON: {"nome":"string","telefone":"string"}
  - Regras: nome com no mínimo duas palavras e 3+ letras cada, telefone entre 8 e 20 caracteres
  - Resposta: 201 com o contato criado

- GET /contatos
  - Resposta: 200 com lista de contatos

- PATCH /contatos/:id
  - Body JSON: {"nome":"string","telefone":"string"}
  - Resposta: 200 com o contato atualizado

- DELETE /contatos/:id
  - Resposta: 204 sem corpo

Exemplos de requisição (curl)
```
# Criar
curl -X POST http://localhost:3000/contatos -H "Content-Type: application/json" -d "{\"nome\":\"Joao Silva\",\"telefone\":\"11999999999\"}"

# Listar
curl http://localhost:3000/contatos

# Atualizar
curl -X PATCH http://localhost:3000/contatos/1 -H "Content-Type: application/json" -d "{\"nome\":\"Ana Maria\"}"

# Deletar
curl -X DELETE http://localhost:3000/contatos/1
```

Estrutura do projeto
```
src/
  controllers/
    contatoController.ts
  database/
    connection.ts
    migrations/
  middleware/
    validation.ts
  routes/
    contatoRoutes.ts
  types/
    Contato.ts
```

Scripts úteis
- npm run dev: inicia o servidor em desenvolvimento
- npm run build: compila TypeScript para dist/
- npm start: executa a build
- npm run migrate:make <nome>: cria nova migration
- npm run migrate:latest: aplica migrations
- npm run migrate:rollback: reverte a última migration