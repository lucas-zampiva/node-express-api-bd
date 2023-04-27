const express = require("express");
const app = express();
const knex = require('./db/db.js');


app.use(express.json());

app.get("/produtos", (_req, res) => {
    knex.select('*').from('produtos').then(produtos => res.json(produtos))
        .catch(err => res.json({ message: `Erro ao recuperar produtos: ${err.message}` }))
})

app.get("/produtos/:id", (req, res) => {
    const id = req.params.id;
    knex.select('*').from('produtos').where({ id })
        .then(produtos => res.json(produtos))
        .catch(err => res.json({ message: `Erro ao recuperar produtos: ${err.message}` }))
})

app.post("/produtos", (req, res) => {
    knex('produtos')
        .insert(req.body, ['id'])
        .then(produtos => {
            let id = produtos[0].id
            res.json({ message: `Produto inserido com sucesso.`, id: id })
        })
        .catch(err => res.json({ message: `Erro ao inserir produto: ${err.message}` }))
})

app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    knex('produtos')
        .where({ id })
        .update({
            descricao: req.body.descricao,
            valor: req.body.valor,
            marca: req.body.marca,
        }, ['id', 'descricao', 'valor', 'marca'])
        .then(_ => {
            res.json({ message: `Produto atualizado com sucesso.` })
        })
        .catch(err => res.json({ message: `Erro ao atualizar produto: ${err.message}` }))
})

app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    knex('produtos')
        .where({ id })
        .del()
        .then(_ => {
            res.json({ message: `Produto excluído com sucesso.` })
        })
        .catch(err => res.json({ message: `Erro ao excluído produto: ${err.message}` }))
})

module.exports = app;
