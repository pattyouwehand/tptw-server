const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING
  },
  round: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Room