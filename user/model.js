const Sequelize = require('sequelize')
const db = require('../db')
const Room = require(
  '../room/model'
)

const User = db.define(
  'user',
  {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    score: Sequelize.INTEGER,
    answered: Sequelize.BOOLEAN,
    allies: Sequelize.BOOLEAN
  }
)

Room.hasMany(User)
User.belongsTo(Room)

module.exports = User