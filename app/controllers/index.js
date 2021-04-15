module.exports.index = function (application,req,res) {
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function (application,req,res) {
    var dadosForm = req.body;

    req.assert('usuario','Campo usuário precisa ser preenchido, tente novamente').notEmpty();
    req.assert('senha','Campo senha precisa ser preenchido, tente novamente').notEmpty()

    var erros = req.validationErrors();

    if (erros){
        res.render('index',{validacao: erros});
        return;
    }

    //método de autenticação
    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req,res);

   // res.send('sessão criada com sucesso, parabéns.');
}