import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Controle de Tarefas',
      version: '1.0.0',
      description: 'API para gerenciamento de tarefas',
    },
    components: {
      schemas: {
        Tarefa: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Estudar Node.js' },
            prioridade: { type: 'string', enum: ['baixa', 'media', 'alta'], example: 'alta' },
            concluida: { type: 'boolean', example: false },
          },
        },
        NovaTarefa: {
          type: 'object',
          required: ['titulo'],
          properties: {
            titulo: { type: 'string', example: 'Estudar Node.js' },
            prioridade: { type: 'string', enum: ['baixa', 'media', 'alta'], example: 'alta' },
          },
        },
        Erro: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'Título é obrigatório' },
          },
        },
      },
    },
    paths: {
      '/tarefas': {
        post: {
          summary: 'Criar uma nova tarefa',
          tags: ['Tarefas'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NovaTarefa' },
              },
            },
          },
          responses: {
            201: {
              description: 'Tarefa criada com sucesso',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Tarefa' } } },
            },
            400: {
              description: 'Dados inválidos',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
          },
        },
        get: {
          summary: 'Listar tarefas',
          tags: ['Tarefas'],
          parameters: [
            {
              name: 'concluida',
              in: 'query',
              required: false,
              description: 'Filtrar por status de conclusão',
              schema: { type: 'boolean' },
            },
          ],
          responses: {
            200: {
              description: 'Lista de tarefas',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/Tarefa' } },
                },
              },
            },
          },
        },
      },
      '/tarefas/{id}/concluir': {
        patch: {
          summary: 'Marcar tarefa como concluída',
          tags: ['Tarefas'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID da tarefa',
              schema: { type: 'integer', example: 1 },
            },
          ],
          responses: {
            200: {
              description: 'Tarefa atualizada',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Tarefa' } } },
            },
            400: {
              description: 'Tarefa não encontrada',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
          },
        },
      },
      '/tarefas/{id}': {
        delete: {
          summary: 'Remover uma tarefa',
          tags: ['Tarefas'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID da tarefa',
              schema: { type: 'integer', example: 1 },
            },
          ],
          responses: {
            204: { description: 'Tarefa removida com sucesso' },
            404: {
              description: 'Tarefa não encontrada',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
