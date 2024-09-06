const mongoose = require('mongoose');

var pedidosSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  produtos: [
    {
      _id: {
        type: String,
        required: true,
      },
      nome: {
        type: String,
        required: true,
      },
      qtd: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  avaliacao: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },
  detalhes: {
    type: String,
  },
  pagamento: {
    type: String,
    required: true,
  },
  qtdTroco: {
    type: Number,
  },
  date_agendada: {
    type: Date,
  },
  date_pedido: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Pedidos', pedidosSchema);
