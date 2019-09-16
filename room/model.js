const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING
  },
  round: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Room