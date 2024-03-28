export const hamburguersData = [
    {
        "id": "1",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer.png",
        "desc": "2 hamburgueres alface queijo molho especial",
        "price": "100.00"
    },
    {
        "id": "2",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer2.png",
        "desc": "Hamburguer duplo com bacon, queijo cheddar e molho barbecue",
        "price": getRandomPrice()
    },
    {
        "id": "3",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer3.png",
        "desc": "Hamburguer vegetariano com hambúrguer de feijão preto, alface, tomate e maionese vegana",
        "price": getRandomPrice()
    },
    {
        "id": "4",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer4.png",
        "desc": "Hamburguer de frango grelhado com abacaxi, queijo suíço e maionese de alho",
        "price": getRandomPrice()
    },
    {
        "id": "5",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer5.png",
        "desc": "Hamburguer de cordeiro com molho de hortelã, rúcula e queijo feta",
        "price": getRandomPrice()
    },
    {
        "id": "6",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer6.png",
        "desc": "Hamburguer de salmão grelhado com abacate, molho de limão e rúcula",
        "price": getRandomPrice()
    },
    {
        "id": "7",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer7.png",
        "desc": "Hamburguer de carne com pimentões grelhados, cebola caramelizada e queijo provolone",
        "price": getRandomPrice()
    },
    {
        "id": "8",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer8.png",
        "desc": "Hamburguer de peru com abacaxi grelhado, cebola roxa e molho de manga",
        "price": getRandomPrice()
    },
    {
        "id": "9",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer9.png",
        "desc": "Hamburguer de cogumelos com queijo gorgonzola e cebolas crocantes",
        "price": getRandomPrice()
    },
    {
        "id": "10",
        "nome": "Hamburguers",
        "src": "src/assets/img/hamburguer10.png",
        "desc": "Hamburguer de quinoa com abobrinha grelhada, tomate seco e maionese de ervas",
        "price": getRandomPrice()
    }
];

function getRandomPrice() {
    return (Math.random() * (20 - 5) + 5).toFixed(2);
}