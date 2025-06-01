const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/controller.site') //import thì ở dạng đối tượng nên không viết hoa chữ cái đầu 

// newsController.index

router.use('/:search', siteController.search)
router.use('/', siteController.index)

module.exports = router