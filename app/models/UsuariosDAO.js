function UsuariosDAO(connection) {
    this._connection =  connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function (err, collection) {
            collection.insert(usuario);

            mongoclient.close(); // passo importante, pois caso contrário toda vez que a função for chamada uma nova conexão será aberta sem nunca fechar a anterior
        }) //collection permite mexer nas collections dentro do mongo. parâmetros: nome da collection, função de callback
    });
}

module.exports = function (params) {
    return UsuariosDAO;
}