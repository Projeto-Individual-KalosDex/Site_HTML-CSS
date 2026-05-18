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
/*adicao do async para poder usar await que sincronizará os inserts em 3 tabelas*/
async function cadastrar(nome, email, senha, nomeTreinador, pokemonFavorito, inicialEscolhido, pokemon1, tipo1_1,
    tipo2_1, pokemon2, tipo1_2,
    tipo2_2, pokemon3, tipo1_3,
    tipo2_3, pokemon4, tipo1_4,
    tipo2_4, pokemon5, tipo1_5,
    tipo2_5, pokemon6, tipo1_6,
    tipo2_6) {
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

    var pokemons = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6];
    var tipos1 = [tipo1_1, tipo1_2, tipo1_3, tipo1_4, tipo1_5, tipo1_6];
    var tipos2 = [tipo2_1, tipo2_2, tipo2_3, tipo2_4, tipo2_5, tipo2_6];

    for (var i = 0; i < 6; i++) {

    instrucaoTime = `INSERT INTO time (pokemon, slotTime, tipo1, tipo2, fkQuestionario) VALUES (
    '${pokemons[i]}',
    ${i + 1},
    '${tipos1[i]}',
    '${tipos2[i]}',
    ${fkQuestionario}
    );
    `;
        await database.executar(instrucaoTime);
    }


}

module.exports = {
    autenticar,
    cadastrar
};