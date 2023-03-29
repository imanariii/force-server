const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Product } = require('../models/models')
const { isEmail } = require("validator");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, address} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        if (!email.includes('@')) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        if (password.length < 6) {
            return next(ApiError.badRequest('Длина password должна быть больше 6 символов'))
        }
        if (email.length < 6) {
            return next(ApiError.badRequest('Длина email должна быть больше 6 символов'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, address: address})
        const token = generateJwt(user.id, user.email, user.role, user.address)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.address)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.address)
        return res.json({token})
    }

    async update(req, res, next) {
        let {address} = req.body
        const {id} = req.params

        const user = await User.update({ address },
          {
              where: {
                  id: id,
              },
          }
        )
        return res.json(user)
    }
    async getAll(req, res, next) {
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()
