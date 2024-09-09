var express = require("express");
var router = express.Router();
var Pedidos = require("../models/pedidos.js");
const auth = require('../middlewares/auth');

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
        res.json(item);
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
      res.json(newPedido);
    })
    .catch((error) => {

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
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
