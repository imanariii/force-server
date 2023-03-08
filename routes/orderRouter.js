const Router = require('express');
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/', orderController.getAll)
router.post('/', orderController.create)
router.delete('/', orderController.delete)

module.exports = router