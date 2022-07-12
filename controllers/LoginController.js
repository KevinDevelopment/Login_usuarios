const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Perguntas = require("../database/Perguntas");

router.get("/user", (request, response) => {
    response.render("login")
});

router.post("/login", async (request, response) => {

    const { id, email, password } = request.body;

    const UserExist = await Perguntas.findOne({
        attributes: ['id', 'nome', 'email', 'password'],
        where: {
            email: email
        }
    });

     console.log(UserExist.id);

    if (UserExist === null) {
        return response.status(400).json({
            mensagem: "Usuário ou senha incorretos, veio como null"
        })
    }

    const pass = await bcrypt.compare(password, UserExist.password);
    if (!pass) {
        return response.status(400).json({
            erro: true,
            mensagem: "Usuário ou senha incorretos, (senha)"
        })
    }

    const token = jwt.sign({ id: UserExist.id }, "D74K693HFEORU4N63U3298FH485HT73H29F", {
        //expiresIn: 60 //1 minuto
        expiresIn: 60 // 1 dias
    });

    return response.status(200).json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token: token
    });

})


module.exports = router;
