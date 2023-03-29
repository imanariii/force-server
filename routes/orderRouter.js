const Router = require('express');
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', orderController.getAll)
router.post('/', authMiddleware, orderController.create)
router.delete('/', orderController.delete)

module.exports = router