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
            // res.send('saved')
            .then(() => res.redirect('/'))
            .catch(next)
    }

    //[get] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    //[put] /courses/:id
    update(req, res, next) {
        // res.json(req.body)

        //muốn chỉnh sửa id trên url 
        Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }) //chọc vào database để sửa và update được document có id là 
            .then((updatedCourse) => { res.redirect('/me/stored/courses'); }) //redirect là tạo ra 1 header location khi trả về qua response trình duyệt sẽ tự hiểu và điều hướng sang path
            .catch(next);
    }

    //[delete] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    //soft delete
    //[delete] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[patch] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next)
    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        // res.json(req.body)
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })//$in: là để req trả về mảng courseIds
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next)
                break;

            default:
                res.json({ message: 'Action is invalid!' })
        }
    }

}
module.exports = new CourseController;





