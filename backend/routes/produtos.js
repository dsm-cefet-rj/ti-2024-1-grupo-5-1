var express = require('express');
var router = express.Router();
var Produtos = require('../models/produtos.js');
const e = require('express');

//Problema de CORS
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // Permite todas as origens
//     res.header("Access-Control-Allow-Methods", "DELETE, GET, PATCH, POST, PUT");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//     // Se a requisição for um preflight (OPTIONS), responda imediatamente
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }

//     next();
// });

// GET /produtos
// Retorna todos os produtos
router.get('/', function (req, res, next) {
    console.log("Listando todos os produtos")
    Produtos.find({}).
        then((produtosData) => {
            res.json(produtosData)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

// GET /produtos/:id
// Retorna um produto específico
router.get('/:id', function (req, res, next) {
    const produtoId = req.params.id
    console.log(produtoId)
    Produtos.findById(produtoId).
        then((produtosData) => {
            res.json(produtosData)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

// POST /produtos
// Cria um novo produto
router.post('/', function (req, res, next) {
    console.log("Criando novo produto")
    const newProduto = req.body

    Produtos.create(newProduto).
        then((newProduto) => {
            res.json(newProduto)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

// PATCH /produtos/:id
// Atualiza um produto específico
router.patch('/:id', function (req, res, next) {
    const produtoId = req.params.id
    const produtoData = req.body

    console.log(produtoData)

    Produtos.findByIdAndUpdate(produtoId, produtoData, { new: true }).
        then((produto) => {
            res.json(produto)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

// DELETE /produtos/:id
// Remove um produto específico
router.delete('/:id', function (req, res, next) {
    const produtoId = req.params.id

    Produtos.findByIdAndDelete(produtoId).
        then((produto) => {
            res.json(produto)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

module.exports = router;