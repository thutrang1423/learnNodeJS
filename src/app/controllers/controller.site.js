class SiteController { //dạng constructor function class viết hoa chữ cái đầu
    //[get] /
    index(req, res) {
        res.render('home');
    }

    //[get] /search
    search(req, res) {
        res.send('search')
    }
}
module.exports = new SiteController;
