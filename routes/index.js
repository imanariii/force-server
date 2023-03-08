const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

module.exports = router
