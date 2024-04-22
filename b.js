const faker = require('faker');

/*
    {
      "id": "",
      "user_id": "",
      "produtos": [
        {
          "id": "",
	  "nome": "",
          "qtd": "",
          "price": ""
        }
      ],
      "total": "Agendado | Em andamento | Entregue | Cancelado",
      "status": "",
      "motivo_cancelamento": "",
      "date_agendada": UNIX,
      "avaliacao": ,
      "detalhes": "",
      "pagamento": Cartão de Crédito | Cartão de Débito | PIX | Dinheiro,
      "date": UNIX
    },

*/

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomTimestampBetween = (start, end) => {
    const startDate = new Date(start).getTime() / 1000;
    const endDate = new Date(end).getTime() / 1000;
  return randomBetween(startDate, endDate);
};

const generatePedido = (id) => {
  return {
    id: id.toString(),
    user_id: faker.datatype.number(5).toString(),
    produtos: [
      {
        id: faker.datatype.number(5).toString(),
        qtd: faker.datatype.number(3).toString(), // Quantidade aleatória de 1 a 3
        price: faker.commerce.price(5, 50, 2) // Preço aleatório entre 5 e 50 com 2 casas decimais
      }
    ],
    total: faker.commerce.price(10, 100, 2), // Total aleatório entre 10 e 100 com 2 casas decimais
    status: faker.random.arrayElement(["Agendado", "Em andamento", "Entregue", "Cancelado"]),
    motivo_cancelamento: faker.lorem.sentence(),
    date_agendada: randomTimestampBetween("2024-04-22T00:00:00Z", "2024-04-24T23:59:59Z"), // Timestamp entre 14/04/2023 e 21/04/2023
    avaliacao: faker.commerce.price(1, 5, 2), 
    detalhes: faker.lorem.sentence(),
    pagamento: faker.random.arrayElement(["PIX", "Boleto", "Cartão de Crédito", "Cartão de Débito"]),
    date: randomTimestampBetween("2024-04-22T00:00:00Z", "2024-04-22T23:59:59Z") // Timestamp entre 14/04/2023 e 21/04/2023
  };
};

const pedidos = [];

for (let i = 51; i <= 60; i++) {
  const pedido = generatePedido(i);
  pedidos.push(pedido);
}

const fs = require('fs');

fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2));
