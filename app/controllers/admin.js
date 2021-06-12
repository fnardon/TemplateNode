module.exports.formulario_inclusao_noticia = function(application,req,res){
    
    res.render("admin/form_add_noticia",{validacao : {}, noticia : {}});

};

module.exports.noticias_salvar = function(application,req,res){

    var noticia = req.body;

        req.assert('titulo', 'O titulo não pode ficar vazio').notEmpty();
        req.assert('resumo', 'O resumo não pode f`icar vazio').notEmpty();
        req.assert('resumo', 'O resumo deve ter de 10 a 100 caracteres').len(10, 100);
        req.assert('autor', 'O autor não pode ficar vazio').notEmpty();
        req.assert('data_noticia', 'A data não pode ficar vazio').notEmpty()
        req.assert('data_noticia', 'A data tem que estar no formato YYYY-MM-DD').isDate({ format: 'YYYY-MM-DD' });
        req.assert('noticia', 'A noticia não pode ficar vazio').notEmpty();


        var erros = req.validationErrors();
        console.log('validacao: ', erros);

        if (erros) {
            res.render("admin/form_add_noticia", { validacao: erros, noticia: noticia });
            return;
        }

        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function (error, result) {
            res.redirect("/noticias");
        });
}