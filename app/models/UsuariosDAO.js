function UsuariosDAO(connection) {
    this._connection =  connection();
}

//método para cadastrar o usuário no banco de dados
UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function (err, collection) {
            collection.insert(usuario);

            mongoclient.close(); // passo importante, pois caso contrário toda vez que a função for chamada uma nova conexão será aberta sem nunca fechar a anterior
        }) //collection permite mexer nas collections dentro do mongo. parâmetros: nome da collection, função de callback
    });
}

//método para autenticar o usuário
UsuariosDAO.prototype.autenticar = function (usuario, req,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function (err, collection) {
            collection.find(usuario).toArray(function(err,result){
                if (result[0] != undefined) {
                    //criando variáveis de sessão, importante para manter o usuário logado independente da rota
                    req.session.autorizado = true
                    req.session.usuario = result[0].usuario
                    req.session.casa = result[0].casa
                } 

                if (req.session.autorizado){
                    res.redirect("jogo")
                } else{
                    res.render('index', {validacao:{}})
                }
            });
            mongoclient.close();
        })
    });
}

module.exports = function (params) {
    return UsuariosDAO;
}