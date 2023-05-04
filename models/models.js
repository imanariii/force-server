const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    address: {type: DataTypes.STRING, defaultValue: 'Адрес не задан'},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    price: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, minLength: 6},
    price: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, defaultValue: 1},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, minLength: 4}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, minLength: 4},
    description: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BrandCategory = sequelize.define('brand_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Orders);
Orders.belongsTo(User)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

Brand.belongsToMany(Category, {through: BrandCategory })
Category.belongsToMany(Brand, {through: BrandCategory })

module.exports = {
    User,
    Orders,
    Product,
    Brand,
    Category,
    BrandCategory,
    ProductInfo
}





