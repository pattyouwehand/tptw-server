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
    score: { type: Sequelize.INTEGER, defaultValue: 0},
    answered: { type: Sequelize.BOOLEAN, defaultValue: false },
    allies: { type: Sequelize.BOOLEAN, defaultValue: false }
  }
)

Room.hasMany(User)
User.belongsTo(Room)

module.exports = User