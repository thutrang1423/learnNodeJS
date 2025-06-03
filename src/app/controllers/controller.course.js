const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/moongose')


class CourseController { //dạng constructor function class viết hoa chữ cái đầu
    //[get] /courses/:slug
    show(req, res, next) {
        // res.send('course detail - ' + req.params.slug)
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.json(course)
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    //[get] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[post] /courses/store
    store(req, res, next) {
        // res.json(req.body)

        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => { })

    }
}
module.exports = new CourseController;





