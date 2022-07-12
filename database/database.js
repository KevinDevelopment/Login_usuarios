const Sequelize =require("sequelize");
const connection = new Sequelize('perguntas', 'root', '12345',{
    host: "localhost",
    dialect: "mysql",
    logging: false
});

connection.authenticate().then(() => {
    console.log("Conexão estabelecida com sucesso!")
}).catch((erro) => {
    console.log(`Ops!, houve um erro ${erro}`)
});

/*async function teste() {
    try{
        const teste = await connection.authenticate();
    }catch(erro) {
        console.log(erro.message); 
      }
   
}*/

module.exports = connection;