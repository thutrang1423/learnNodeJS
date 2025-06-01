const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/controller.news') //import thì ở dạng đối tượng nên không viết hoa chữ cái đầu 

// newsController.index

router.use('/:slug', newsController.show)
router.use('/', newsController.index)

module.exports = router