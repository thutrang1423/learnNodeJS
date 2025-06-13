const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/controller.course') //import thì ở dạng đối tượng nên không viết hoa chữ cái đầu 

// newsController.index
router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/:id/edit', courseController.edit)
router.post('/handle-form-actions', courseController.handleFormActions)
router.patch('/:id/restore', courseController.restore)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)
router.get('/:slug', courseController.show)

module.exports = router