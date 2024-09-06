const mongoose = require('mongoose');
const express = require('express');
const app = express();

const routes = require("./routes")
require('dotenv').config();

try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    routes(app);
    
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });    
} catch (error) {
    console.log(error);
}
