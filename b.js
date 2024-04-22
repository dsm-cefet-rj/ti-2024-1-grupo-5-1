const faker = require('faker');

// Função para gerar um número aleatório dentro de um intervalo
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Função para gerar um timestamp Unix aleatório entre duas datas em 2024
const randomTimestampBetween = (start, end) => {
    const startDate = new Date(start).getTime() / 1000;
    const endDate = new Date(end).getTime() / 1000;
  return randomBetween(startDate, endDate);
};

// Função para gerar um pedido
const generatePedido = (id) => {
  return {
    id: id.toString(),
    user_id: id.toString(),
    produtos: [
      {
        id: id.toString(),
        qtd: faker.datatype.number(3).toString(), // Quantidade aleatória de 1 a 3
        price: faker.commerce.price(5, 50, 2) // Preço aleatório entre 5 e 50 com 2 casas decimais
      }
    ],
    total: faker.commerce.price(10, 100, 2), // Total aleatório entre 10 e 100 com 2 casas decimais
    status: "Entregue",
    motivo_cancelamento: "",
    detalhes: faker.lorem.sentence(),
    pagamento: faker.random.arrayElement(["PIX", "Boleto", "Cartão de Crédito"]),
    date: randomTimestampBetween("2023-02-18T00:00:00Z", "2023-05-21T23:59:59Z") // Timestamp entre 18/02/2023 e 21/03/2023
  };
};

// Array para armazenar os pedidos
const pedidos = [];

// Gerar 10 pedidos a partir do ID 20
for (let i = 30; i < 40; i++) {
  const pedido = generatePedido(i);
  pedidos.push(pedido);
}

// writes it to file

const fs = require('fs');

fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2));
