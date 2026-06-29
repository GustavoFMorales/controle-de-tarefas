# Controle de Tarefas

API REST para gerenciamento de tarefas, desenvolvida com Node.js, Express e MySQL.

## Tecnologias

- Node.js (ESModules)
- Express 5
- MySQL2
- Swagger (documentação)
- Mocha + Chai + Supertest (testes)

## Pré-requisitos

- Node.js v18+
- MySQL rodando na porta 3306

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=api_tarefas_test
DB_PORT=3306
```

## Executando o servidor

```bash
node src/serve.js
```

O servidor sobe em `http://localhost:3000`.

## Documentação (Swagger)

Com o servidor rodando, acesse:

```
http://localhost:3000/docs
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/tarefas` | Criar uma nova tarefa |
| GET | `/tarefas` | Listar todas as tarefas |
| GET | `/tarefas?concluida=false` | Filtrar tarefas pendentes |
| PATCH | `/tarefas/:id/concluir` | Marcar tarefa como concluída |
| DELETE | `/tarefas/:id` | Remover uma tarefa |

### POST /tarefas

**Body:**
```json
{
  "titulo": "Estudar Node.js",
  "prioridade": "alta"
}
```

- `titulo` — obrigatório
- `prioridade` — opcional, valores: `baixa` (padrão), `media`, `alta`

**Resposta 201:**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "prioridade": "alta",
  "concluida": false
}
```

## Testes

```bash
npm test
```

Os testes utilizam Mocha + Supertest e requerem o servidor rodando em `http://localhost:3000`.

O relatório HTML é gerado automaticamente pelo **mochawesome** na pasta `mochawesome-report/`.

## Estrutura do projeto

```
controle-de-tarefas/
├── src/
│   ├── config/
│   │   ├── database.js       # Conexão com o MySQL
│   │   └── swagger.js        # Configuração do Swagger
│   ├── routes/
│   │   └── tarefasRoutes.js  # Definição das rotas
│   ├── services/
│   │   └── tarefaService.js  # Regras de negócio
│   ├── app.js                # Configuração do Express
│   └── serve.js              # Ponto de entrada do servidor
├── test/
│   └── tarefas.test.js       # Testes automatizados
├── .env
└── package.json
```
