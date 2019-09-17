const express = require('express')
const { Router } = express
const User = require('./model')
const bcrypt = require('bcryptjs')
const auth = require('../auth/middleware')


function factory() {
  const router = new Router()

  router.post('/user', (req, res, next) => {
    const user = {
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10)
    }
    
    User
      .create(user)
      .then(user => { res.send(user)})
      .catch(err => next(err))
  })

  router.put('/user/:id', (req, res, next) => {
    User.findByPk(req.params.id)
      .then(user => {
        console.log(req.body)
        user.update({ roomId: req.body.roomId })
      })
      .then(user => res.json(user))
  })
  return router
}



module.exports = factory