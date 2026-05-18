var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        console.log(res.json(resultadoAutenticar[0]))
                    }
                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
// Adição do async para sincronizar os inserts das 3 tabelas
async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeTreinador = req.body.nometreinadorServer;
    var pokemonFavorito = req.body.favoritoServer;
    var inicialEscolhido = req.body.inicialServer;


    var pokemon1 = req.body.pokemon1Server;
    var tipo1_1 = req.body.tipo1_1Server;
    var tipo2_1 = req.body.tipo2_1Server;

    var pokemon2 = req.body.pokemon2Server;
    var tipo1_2 = req.body.tipo1_2Server;
    var tipo2_2 = req.body.tipo2_2Server;

    var pokemon3 = req.body.pokemon3Server;
    var tipo1_3 = req.body.tipo1_3Server;
    var tipo2_3 = req.body.tipo2_3Server;

    var pokemon4 = req.body.pokemon4Server;
    var tipo1_4 = req.body.tipo1_4Server;
    var tipo2_4 = req.body.tipo2_4Server;

    var pokemon5 = req.body.pokemon5Server;
    var tipo1_5 = req.body.tipo1_5Server;
    var tipo2_5 = req.body.tipo2_5Server;

    var pokemon6 = req.body.pokemon6Server;
    var tipo1_6 = req.body.tipo1_6Server;
    var tipo2_6 = req.body.tipo2_6Server;



    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, nomeTreinador, pokemonFavorito, inicialEscolhido, pokemon1, tipo1_1,
            tipo2_1, pokemon2, tipo1_2,
            tipo2_2, pokemon3, tipo1_3,
            tipo2_3, pokemon4, tipo1_4,
            tipo2_4, pokemon5, tipo1_5,
            tipo2_5, pokemon6, tipo1_6,
            tipo2_6)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}