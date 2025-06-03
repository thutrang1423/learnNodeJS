const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/controller.course') //import thì ở dạng đối tượng nên không viết hoa chữ cái đầu 

// newsController.index
router.get('/create', courseController.create)
router.post('/store', courseController.store)

router.get('/:slug', courseController.show)

module.exports = router