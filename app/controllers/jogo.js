module.exports.jogo = function (application,req,res) {
    //restringindo o acesso apenas á usuários cadastrados
    if(req.session.autorizado){
        res.render('jogo');
    } else{
        res.send('Usuário precisa estar logado')
    }

}