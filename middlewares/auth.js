const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
    eAdmin: async function (request, response, next) {
        const authHeader = request.headers.authorization;
        //console.log(authHeader);

        if (!authHeader) {
            return response.status(400).json({
                erro: true,
                mensagem: "Token não veio"
            })
        }

        const [, token] = authHeader.split(' ');
        console.log(`Token ${token}`);

        if (!token) {
            return response.status(400).json({
                erro: true,
                mensagem: "Token não enviado"
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, "D74K693HFEORU4N63U3298FH485HT73H29F");
            request.userId = decode.id;
            next();
        } catch (erro) {
            return response.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário login para acessar a página, token invalido"
            })
        }

    }
}