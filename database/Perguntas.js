const Sequelize = require("sequelize");
const connection = require("./database");


const Login = connection.define('kevin_login', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Login.sync({force: false}).then(() => {
    console.log("Tabela criada!")
}).catch((erro) => {
    console.log(`Ops!, houve um erro ${erro}`)
});

module.exports = Login;