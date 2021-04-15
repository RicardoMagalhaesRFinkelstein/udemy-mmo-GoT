module.exports.jogo = function (application,req,res) {
    //restringindo o acesso apenas á usuários cadastrados
    if(req.session.autorizado){
        res.render('jogo');
    } else{
        res.send('Usuário precisa estar logado')
    }

}

module.exports.sair = function (application,req,res) {
    //destruindo a sessão, de forma á deslogar o usuário
    req.session.destroy(function (err,) {
        res.render('index', {validacao:{}})
    })
}