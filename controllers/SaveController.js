const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Perguntas = require("../database/Perguntas");

router.get("/registrar", (request, response) => {
    response.render("index")
});

router.post("/cadastrar", async (request, response) => {

    const { nome, email, password } = request.body;
    const hashed = await bcrypt.hash(password, 10);

    const EmailExist = await Perguntas.findOne({
        attributes: ['id', 'nome', 'email', 'password'],
        where: {
            email: email
        }
    });

    console.log(EmailExist);

    if (!EmailExist) {

        await Perguntas.create({
            nome: nome,
            email: email,
            password: hashed
        }).then(() => {
            console.log("Dados inseridos")

            response.status(200).json({
                nome: nome,
                email: email,
                senha: hashed
            });


        }).catch((erro) => {
            console.log(`Ops!, houve um erro ${erro}`)
        })

    }
    else {
        response.status(400).json({
            erro: true,
            mensagem: "ja existe um usuário cadastrado com este email"
        })
    }





});

module.exports = router;

