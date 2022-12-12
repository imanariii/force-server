const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)

module.exports = router
