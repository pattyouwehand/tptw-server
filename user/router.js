const express = require('express')
const { Router } = express
const User = require('./model')
const bcrypt = require('bcryptjs')
const auth = require('../auth/middleware')


function factory(update) {
  const router = new Router()

  async function onRegistry (req, res) {
    const user = {
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10)
    }

    const registeredUser = await User.create(user)

    await update()

    return res.send(registeredUser)
  }

  router.post('/user', onRegistry)

  async function onRoomEntry (req, res) {
    const enteredUser = await User.findByPk(req.params.id)
    const updatedUser = await enteredUser.update({ roomId: req.body.roomId})

    await update()
      
    return res.send(updatedUser)
  }

  router.put('/user/:id', onRoomEntry)
  
    router.put('/user/:id/allies', (req, res, next) => {
    User.findByPk(req.params.id)
      .then(user => {
        user.update({ allies: true })
      })
      .then(user => res.json(user))
      .catch(err => next(err))
  })
  
  return router
}



module.exports = factory