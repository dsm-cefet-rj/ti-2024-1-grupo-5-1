// Função para converter uma data para timestamp Unix
const toTimestamp = (date) => Math.floor(date.getTime() / 1000);

// Criar objetos Date para as datas desejadas
const dataInicio = new Date('2024-03-12T00:00:00Z'); // 18/04/2024 às 00:00:00
const dataFim = new Date('2024-04-21T00:00:00Z'); // 21/04/2024 às 00:00:00

// Criar um array para armazenar os timestamps
const timestamps = [];

// Loop de dataFim até dataInicio, decrementando um dia por vez
for (let data = dataFim; data >= dataInicio; data.setDate(data.getDate() - 1)) {
  // Converter cada data para timestamp Unix e adicionar ao array
  timestamps.push(toTimestamp(data));
}

// Resultado
console.log(timestamps);
