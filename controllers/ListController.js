const express = require("express");
const router = express.Router();
const { eAdmin } = require("../middlewares/auth");

router.get("/listar", eAdmin, async (request, response) => {
    return response.json({
        erro: false,
        mensagem: "parabéns, você esta logado"
    })
});

module.exports = router;