const express = require('express');
const cors = require('cors');
const acess = require('./acess.js'); // Corrigindo o caminho do módulo
const busca = require('./Busca.js');

const app = express();
const cor = cors();

app.use(cor);
app.use(express.json()); // Adicionando middleware para analisar o corpo da solicitação como JSON

app.post('/candidato', async (req, res) => {
    const { pageSize, pageNumber } = req.body; // Use req.query para acessar os parâmetros da consulta
    // Converte pageSize e pageNumber em números inteiros
    const pageSizeInt = parseInt(pageSize);
    const pageNumberInt = parseInt(pageNumber);
    // Verifica se pageSize e pageNumber são números inteiros válidos
    if (isNaN(pageSizeInt) || isNaN(pageNumberInt)) {
        return res.status(400).json({ error: 'pageSize and pageNumber must be integers' });
    }
    // Chama a função de acesso com os parâmetros fornecidos
    const dados = await acess( pageNumberInt, pageSizeInt );
    console.log(dados);
    res.json(dados);
});

app.post('/candidato/busca', async (req, res) => {
    const {pageNumber, pageSize, searchTerm, searchCity} = req.body;
    const dados = await busca(pageNumber, pageSize, searchTerm, searchCity);
    res.json(dados);
})

app.post(``)
app.listen(3000, () => {
    console.log("Server running on port " + 3000);
});

