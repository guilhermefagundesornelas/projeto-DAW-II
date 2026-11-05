
export default class siteController {

    constructor() {

        this.index = async (req, res) => {
            res.render('site/index');
        };

        this.servicos = (req, res) => {
            res.render('site/servicos');
        };

        this.categorias = (req, res) => {
            res.render('site/categorias');
        };

        this.carrinho = (req, res) => {
            res.render('site/carrinho');
        };

        this.contratacoes = (req, res) => {
            res.render('site/contratacoes');
        };

    }
}
