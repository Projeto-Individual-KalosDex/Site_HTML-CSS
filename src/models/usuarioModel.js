var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
/*adicao do async para poder usar await que sincronizará os inserts em 3 tabelas*/ async function cadastrar(nome, email, senha, nomeTreinador, pokemonFavorito, inicialEscolhido, time) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    // INSERT NO USUARIO
    var instrucaoSqlUsuario = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlUsuario);

    var resultadoUsuario = await database.executar(instrucaoSqlUsuario);

    var fkUsuario = resultadoUsuario.insertId;

    console.log(fkUsuario);

    // INSERT NO QUESTIONARIO 
    var instrucaoQuestionario = `
    INSERT INTO questionario (nomeTreinador, pokemonFavorito, inicialEscolhido, fkUsuario) VALUES ('${nomeTreinador}', '${pokemonFavorito}', '${inicialEscolhido}', ${fkUsuario});`

    var resultadoQuestionario = await database.executar(instrucaoQuestionario);

    var fkQuestionario = resultadoQuestionario.insertId

    console.log(resultadoQuestionario);

    // INSERT NO TIME

    for (var i = 0; i < time.length; i++) {
        var pokemonAtual = time[i];
        var instrucaoTime = `
    INSERT INTO time (pokemon, slotTime, tipo1, tipo2, fkQuestionario) VALUES ('${pokemonAtual.pokemon}', ${pokemonAtual.slot}, '${pokemonAtual.tipo1}', '${pokemonAtual.tipo2}', ${fkQuestionario});
    `;
        await database.executar(instrucaoTime);
    }


}

module.exports = {
    autenticar,
    cadastrar
};