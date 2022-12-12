const {Category} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Category.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const category = await Category.findAll()
        return res.json(category)
    }

}

module.exports = new CategoryController()
