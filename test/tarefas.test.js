import request from "supertest";
import { expect } from "chai";

describe("Tarefas", () => {
  describe("POST /tarefas", () => {
    it("Deve retornar 201 quando a tarefa for cadastrada com sucesso", async () => {
      const response = await request("http://localhost:3000")
        .post("/tarefas")
        .set("Content-Type", "application/json")
        .send({
          titulo: "Estudar Arquitetura de software",
          prioridade: "media",
        });
      expect(response.status).to.equal(201);
    });
    it("Deve retornar 400 quando o titulo não for preenchido", async () => {
      const response = await request("http://localhost:3000")
        .post("/tarefas")
        .set("Content-Type", "application/json")
        .send({
          prioridade: "Alta",
        });
      expect(response.status).to.equal(400);
      expect(response.body.erro).to.equal("Título é obrigatório");
    });
    it("Deve retornar 201 quando a tarefa for cadastrada com sucesso sem a informação de prioridade", async () => {
      const response = await request("http://localhost:3000")
        .post("/tarefas")
        .set("Content-Type", "application/json")
        .send({
          titulo: "Estudar Ingles",
        });
      expect(response.status).to.equal(201);
      expect(response.body.titulo).to.equal("Estudar Ingles");
      expect(response.body.prioridade).to.equal("baixa");
    });
  });
  describe("GET /tarefas", () => {
     it("Deve retornar 200 quando solicitar todas as tarefas", async () =>{
         const response = await request("http://localhost:3000")
            .get('/tarefas')
        expect(response.status).to.equal(200);
        expect(response.body[0].ID).to.equal(1);
        expect(response.body[0].titulo).to.equal('Estudar teste api rest');

     })
  });
  describe('PATCH /tarefas', () => {
    it('Deve retornar 200 ao concluir a tarefa', async () => {
        const response = await request('http://localhost:3000')
            .patch('/tarefas/7/concluir')
        expect(response.status).to.equal(200);
    })
  })
});
