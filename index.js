const express = require("express");
const app = express();
const connection = require("./database/database");
const listcontroller = require("./controllers/ListController");
const logincontroller = require("./controllers/LoginController");
const savecontroller = require("./controllers/SaveController");

//settings express
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

//routes express
app.use("/", listcontroller);
app.use("/", logincontroller);
app.use("/", savecontroller);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});