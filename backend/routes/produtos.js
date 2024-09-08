var express = require('express');
var router = express.Router();
var Produtos = require('../models/produtos.js');
var auth = require('../middlewares/auth.js')
const ProductService = require('../services/produtos.js');

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

// GET /produtos - Retorna todos os produtos
router.get('/', function (req, res, next) {
    Produtos.find({}).
        then((produtosData) => {
            res.json(produtosData)
        }).
        catch((error) => {
            res.status(500).json({ message: error.message })
        })
});

// GET /produtos/:id - Retorna um produto específico
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

// POST /produtos - Cria um novo produto
router.post('/', auth, function (req, res, next) {
    ProductService.upload(req, res, () => {
      const newProduto = {
        ...req.body,
        src: req.file ? req.file.filename : null
      };
  
      Produtos.create(newProduto)
        .then(produtoCriado => res.json(produtoCriado))
        .catch(error => res.status(500).json({ message: error.message }));
    });
  });
  
  // PATCH /produtos/:id - Atualiza um produto específico
  router.patch('/:id', auth, function (req, res, next) {
    const produtoId = req.params.id;
  
    ProductService.upload(req, res, () => {
      Produtos.findById(produtoId)
        .then(produto => {
          if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
          }
  
          if (req.file && produto.src) {
            ProductService.removeImage(produto.src);
          }
  
          const updatedProduto = {
            ...req.body,
            src: req.file ? req.file.filename : produto.src
          };
  
          Produtos.findByIdAndUpdate(produtoId, updatedProduto, { new: true })
            .then(produtoAtualizado => res.json(produtoAtualizado))
            .catch(error => res.status(500).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
    });
  });  

// DELETE /produtos/:id - Remove um produto específico
router.delete('/:id', auth, function (req, res, next) {
    const produtoId = req.params.id;

    Produtos.findById(produtoId)
        .then(produto => {
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            if (produto.src) {
                ProductService.removeImage(`../uploads/${produto.src}`);
            }

            Produtos.findByIdAndDelete(produtoId)
                .then(() => res.status(204).end())
                .catch(error => res.status(500).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
});

module.exports = router;