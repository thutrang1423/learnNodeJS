const Course = require('../models/Course')
const { mulipleMongooseToObject, mongooseToObject } = require('../../util/moongose')


class SiteController { //dạng constructor function class viết hoa chữ cái đầu
    //[get] /
    async index(req, res, next) {
        // try {
        //     const courses = await Course.find({});
        //     res.json(courses);
        // } catch (err) {
        //     next(err)
        //     // res.status(400).json({ errors: "ERROR!!!" });
        // }

        Course.find({})
            // .then(courses => res.render('home', { courses: courses }))
            //đoạn code này bị lỗi không gọi ra được do object do mongoose trả về là object constructor(có proto và những thuộc tính phức tạp hơn) và những option ta cần thì nằm trong proto không nằm trực tiếp trong object 

            // .then(courses => {
            //     courses = courses.map(course => course.toObject()) //chỉnh sửa lại courses thành object thường trước khi chuyền sang view
            //     res.render('home', { courses })
            // })

            .then(courses => {
                res.render('home', { courses: mulipleMongooseToObject(courses) })
            })
            .catch(next)
    }

    //[get] /search
    search(req, res) {
        res.send('search')
    }
}
module.exports = new SiteController;
