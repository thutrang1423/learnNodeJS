class NewsController { //dạng constructor function class viết hoa chữ cái đầu
    //[get] /news
    index(req, res) {
        res.render('news');
    }

    //[get] /news/:slug
    show(req, res) {
        res.send('news detail!!!')
    }
}
module.exports = new NewsController;
