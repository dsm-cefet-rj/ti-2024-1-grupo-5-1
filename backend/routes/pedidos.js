var express = require("express");
var router = express.Router();
var Pedidos = require("../models/pedidos.js");
var auth = require('../middlewares/auth.js')
const e = require("express");


router.get("/",  function (req, res, next) {
  const user_id = req.query.user_id;

  Pedidos.find({ user_id })
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// GET /pedidos/:id
// Retorna um pedido específico
router.get("/:id", function (req, res, next) {
  const pedidoId = req.params.id;
  Pedidos.findById(pedidoId)
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// POST /pedidos
// Cria um novo pedido
router.post("/", function (req, res, next) {
  const newPedido = req.body;

  Pedidos.create(newPedido)
    .then((newPedido) => {
      console.log("Pedido Criado com sucesso ! ", newPedido);
      res.json(newPedido);
    })
    .catch((error) => {
      console.log("Error! ", error);
      res.status(500).json({ message: error.message });
    });
});

router.patch("/:id", function (req, res, next) {
  const id = req.params.id;
  const avaliacao = req.body.avaliacao;

  Pedidos.findByIdAndUpdate(id, { avaliacao })
    .then((item) => {
      console.log("Pedido Atualizado com sucesso ! ", item);
      res.json(item);
    })
    .catch((error) => {
      console.log("Error! ", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
