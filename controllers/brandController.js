const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        const {name} = req.body
        if(name.length > 4) {
            return next(ApiError.badRequest('Длина наименования должна быть больше 4'))
        }
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()
