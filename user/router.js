const express = require('express')
const { Router } = express
const User = require('./model')
const bcrypt = require('bcryptjs')


function factory(update) {
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
  return router
}



module.exports = factory