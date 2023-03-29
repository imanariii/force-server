const {Category} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res, next) {
        const {name} = req.body
        if(name.length > 4) {
            return next(ApiError.badRequest('Длина наименования должна быть больше 4'))
        }
        const brand = await Category.create({name})
        return res.json(brand)
    }



    async getAll(req, res) {
        const category = await Category.findAll()
        return res.json(category)
    }

}

module.exports = new CategoryController()
