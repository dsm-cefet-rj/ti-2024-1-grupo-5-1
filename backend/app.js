const express = require('express')
const app = express();
const connect = require("./database/config")
const routes = require("./routes")
require('dotenv').config()

connect();

routes(app);
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running')
})

