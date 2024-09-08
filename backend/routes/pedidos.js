var express = require("express");
var router = express.Router();
var Pedidos = require("../models/pedidos.js");
var auth = require('../middlewares/auth.js')

router.get("/ativos", auth, function (req, res, next) {
  Pedidos.find({})
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/", auth, function (req, res, next) {
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
router.get("/:id", auth, function (req, res, next) {
  const pedidoId = req.params.id;
  Pedidos.findById(pedidoId)
    .then((item) => {
      console.log(item, req.user_id, req.user_role);
      if ((item.user_id !== req.user_id) && (req.user_role !== 'admin')) {
        return res.status(403).json({ message: 'Você não tem permissão para acessar este pedido!' });
      } else {
        res.json(item);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// POST /pedidos
// Cria um novo pedido
router.post("/", auth, function (req, res, next) {
  const newPedido = req.body;

  Pedidos.create(newPedido)
    .then((newPedido) => {
      console.log("Pedido criado com sucesso! ", newPedido);
      res.json(newPedido);
    })
    .catch((error) => {
      console.log("Error! ", error);
      res.status(500).json({ message: error.message });
    });
});

router.patch("/:id", auth, function (req, res, next) {
  const id = req.params.id;
  const { avaliacao, status } = req.body;

  const updateFields = {};
  if (avaliacao) {
    updateFields.avaliacao = avaliacao;
  }
  if (status) {
    updateFields.status = status;
  }

  Pedidos.findByIdAndUpdate(id, updateFields)
    .then((item) => {
      console.log("Pedido atualizado com sucesso! ", item);
      res.json(item);
    })
    .catch((error) => {
      console.log("Error! ", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
