const Course = require('../models/Course')
const { mulipleMongooseToObject, mongooseToObject } = require('../../util/moongose')


class MeController {
    //[get] /me/stored/courses
    storedCourses(req, res, next) {
        // res.render('me/stored-courses');
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', { courses: mulipleMongooseToObject(courses) })
            })
            .catch(next);
    }
}
module.exports = new MeController;