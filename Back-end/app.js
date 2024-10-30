const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

//converte o 'body' das requisições em json
app.use(bodyParser.json()); //já inclui o URL-encoded 

app.use(cors());
//lista que será manipulada na API
let produtos = []

//LISTA TODA
app.get("/produto",(req,res)=>{
    res.json(produtos)
})

//ADICIONA ÍTEM A LISTA
app.post("/produto",(req,res)=>{
    const descricao = req.body
    const marca = req.body
    const valor = req.body
    const quantidade = req.body
    const produto = req.body
    let novoId;
    if (produtos.length > 0) {
        let utimoproduto = produtos[produtos.length - 1];
        novoId = (parseInt(utimoproduto.id) + 1).toString();
    } else {
        novoId = '1';
    }
    produto.id = novoId;
    produtos.push(produto)
    res.status(201).send("Usuário criado.")
})

//BUSCA UM ÍTEM NA LISTA PELO ID
app.get("/produto/:id",(req,res)=>{
    const id = req.params.id
    const produto = produtos.find(u => u.id === id)
    if (produto){
        res.json(produto)
    }else{
        res.status(404).send("Registro não encontrado.")
    }
})
//ATUALIZA UM ÍTEM NA LISTA PELO ID
app.put("/produto/:id",(req,res)=>{
    const id = req.params.id
    const indice = produtos.findIndex(u => u.id === id)
    if (indice !== -1){
        produtos[indice] = req.body
        res.send("Registro atualizado.")
    }else{
        res.status(404).send("Registro não encontrado.")
    }
})
//DELETE UM ÍTEM NA LISTA PELO ID
app.delete("/produto/:id", (req, res)=>{
    const id = req.params.id
//o filtro retorna todos os itens da lista com o id diferente do informado
    produtos = produtos.filter(u => u.id !== id)
    
    res.send("Usuário excluido.")
})

app.listen(3000, (err)=>{
    if (err){
        console.log(`Algo errado:${err}`)
    }else{
        console.log('Servidor on-line')
    }
})