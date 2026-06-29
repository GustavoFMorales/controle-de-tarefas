import pool from './src/config/database.js';
import TarefaService from './src/services/TarefaService.js';

const service = new TarefaService();

try {
  const tarefa = await service.criar('Minha primeira tarefa no banco', 'alta');
  console.log('Tarefa criada:', tarefa);

  const todas = await service.listar();
  console.log('Todas as tarefas:', todas);

  const pendentes = await service.listar(false);
  console.log('Tarefas pendentes:', pendentes);
} catch (err) {
  console.error('Erro:', err.message);
} finally {
  await pool.end();
}
