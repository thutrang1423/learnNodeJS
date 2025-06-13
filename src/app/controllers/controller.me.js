const Course = require('../models/Course')
const { mulipleMongooseToObject, mongooseToObject } = require('../../util/moongose')


class MeController {
    //[get] /me/stored/courses
    storedCourses(req, res, next) {
        //res.render('me/stored-courses');

        // res.json(res.locals._sort);

        let courseQuery = Course.find({});

        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            courseQuery = courseQuery.sort({
                // name: 'desc'
                [req.query.column]: req.query.type
            })
        }

        Promise.all([
            courseQuery,
            Course.countDocumentsDeleted({ deletedAt: { $ne: null } })
        ]) //cần một mảng các promise, không phải hai tham số riêng lẻ như vậy.
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mulipleMongooseToObject(courses),
                });
            })
            .catch(next);



        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => { })
        // Course.find({})
        //     .then((courses) => {
        //         res.render('me/stored-courses', { courses: mulipleMongooseToObject(courses) })
        //     })
        //     .catch(next);
    }

    //[get] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => {
                const deletedCourses = courses.filter(course => !!course.deletedAt); // chỉ lấy những cái bị xoá thực sự
                //!!course.deletedAt có nghĩa:
                //Nếu deletedAt tồn tại (tức là khóa học đang bị xóa), giữ lại.
                //Nếu deletedAt không còn (tức là đã restore), loại bỏ.
                //!! ép giá trị về kiểu boolean (true hoặc false).
                res.render('me/trash-courses', {
                    courses: mulipleMongooseToObject(deletedCourses)
                });
            })
            .catch(next);
    }
}
module.exports = new MeController;