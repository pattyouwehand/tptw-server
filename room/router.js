const express = require('express')
const { Router } = express
const Room = require('./model')
const auth = require('../auth/middleware')

function factory (update) {
  const router = new Router()

  async function newRoom (req, res) {
    const { name } = req.body

    const room = await Room.create({ name })

    await update()

    return res.send(room)
  }

  router.post('/room', auth, newRoom)

  return router
}

module.exports = factory