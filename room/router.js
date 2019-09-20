const express = require('express')
const { Router } = express
const Room = require('./model')
const User = require('../user/model')
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

  router.get('/room/:id', (req, res, next) => {
    Room.findByPk(req.params.id
      , {include: [{where: {roomId: req.params.id}}]}) 
      .then(room => {
        if (room) {
          res.json(room)
        } else {
          res.status(404).end()
        }
      })
  })

  async function goToNextRound (req, res) {
    const room = await Room.findByPk(req.params.id)
    const updatedRoom = await room.update({ round: room.round + 1 })

    await update()

    return res.send(updatedRoom)
  }
  
  router.put('/room/:id/nextRound', goToNextRound)

  return router
}

module.exports = factory