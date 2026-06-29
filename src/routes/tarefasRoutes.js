import express from "express";
import TarefasService from "../services/tarefaService.js";

const router = express.Router();
const service = new TarefasService();

router.post("/tarefas", async (req, res) => {
  try {
    const { titulo, prioridade } = req.body;

    const tarefa = await service.criar(titulo, prioridade);

    res.status(201).json(tarefa);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

router.get("/tarefas", async (req, res) => {
  const { concluida } = req.query;
  let filtro;
  if (concluida === "true") {
    filtro = true;
  }
  if (concluida === "false") {
    filtro === false;
  }

  const tarefas = await service.listar(filtro);
  res.status(200).json(tarefas);
});

router.patch("/tarefas/:id/concluir", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tarefa = await service.concluir(id);
    res.status(200).json(tarefa);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

router.delete("/tarefas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await service.remover(id);
    res.status(204).send(); // 204 = sem corpo de resposta
  } catch (erro) {
    res.status(404).json({ erro: erro.message });
  }
});

export { router };
