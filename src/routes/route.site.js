const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/controller.site') //import thì ở dạng đối tượng nên không viết hoa chữ cái đầu 

// newsController.index

router.get('/:search', siteController.search)
router.get('/', siteController.index)

module.exports = router