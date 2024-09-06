const users = [
    {
      "_id": {"$oid": "66b977439fa92e56b72ba723"},
      "nome": "Usuário",
      "sobrenome": "Teste",
      "email": "user@teste.com",
      "senha": "senha123",
      "telefone": "1234567890",
      "logradouro": "Logradouro",
      "numero": "123",
      "complemento": "Complemento",
      "bairro": "Bairro",
      "cidade": "Cidade",
      "cep": "12345678",
      "date": 1713747305,
      "role": "user"
    },
    // Adicione os outros objetos JSON aqui...
  ];
  
  let idCounter = 1;


  printjson(users);

  db.users.find().forEach(function(user) {
    db.users.update(
      { _id: user._id },
      { $set: { id: idCounter++ } }
    );
  });