const {Orders } = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController {
  async create(req, res, next) {
    try {
      let {productId, price, address } = req.body
      const userId = req.user.id

      const order = await Orders.create({productId, price, address, userId})
      return res.json(order)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let orders = await Orders.findAndCountAll({limit, offset})
    return res.json(orders)
  }

  async delete(req, res) {
    const {id} = req.params
    const order = await Orders.destroy({
      where: {id}
    })
    return res.json(order)
  }
}


module.exports = new OrderController()
