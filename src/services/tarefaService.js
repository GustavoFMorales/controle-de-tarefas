import pool from "../config/database.js";
class TarefasService {
  async criar(titulo, prioridade = "baixa") {
    if (!titulo || !titulo.trim()) {
      throw new Error("Título é obrigatório");
    }
    if (!["baixa", "media", "alta"].includes(prioridade)) {
      throw new Error("Prioridade inválida");
    }
    const [resultado] = await pool.query(
      "INSERT INTO tarefas (titulo, prioridade) VALUES (?, ?)",
      [titulo, prioridade],
    );

    return {
      id: resultado.insertId,
      titulo,
      prioridade,
      concluida: false,
    };
  }
  async listar(concluida) {
    if (concluida === undefined) {
      const [resultado] = await pool.query("SELECT * FROM tarefas");
      return resultado;
    } else if (concluida === true || concluida === false) {
      const [resultado] = await pool.query(
        "SELECT * FROM tarefas where concluida = ?",
        [concluida],
      );
      return resultado;
    }
  }

  async concluir(id) {
    const [resultadoUpdate] = await pool.query(
      "UPDATE tarefas SET concluida = true WHERE id = ?",
      [id],
    );
    if (resultadoUpdate.affectedRows === 0) {
      throw new Error("Tarefa não encontrada");
    }
    const [linhas] = await pool.query("SELECT * FROM tarefas WHERE id = ?", [
      id,
    ]);
    return linhas[0];
  }
  async remover(id) {
    const [resultadoDelete] = await pool.query(
      "DELETE FROM tarefas WHERE id = ?",
      [id],
    );
    if (resultadoDelete.affectedRows === 0) {
      throw new Error("Tarefa não encontrada");
    }
    return true;
  }
}

export default TarefasService;
