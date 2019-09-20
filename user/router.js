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
  
  async function chooseSide(req, res) {
    const user = await User.findByPk(req.params.id)
    const userWithSide = await user.update({ allies: true })

    await update()

    return res.send(userWithSide)
  }


  router.put('/user/:id/allies', chooseSide)

  async function answeredRight(req, res){
    const user = await User.findByPk(req.params.id)
    const updateStatus = await user.update({
      score: user.score +1,
      answered: true})

    await update()

    return res.send(updateStatus)

  }

  router.put('/user/:id/alliedgame', answeredRight)


async function answeredWrong(req, res){
  const user = await User.findByPk(req.params.id)
  const updateStatus = await user.update({
    answered: true })

  await update()

  return res.send(updateStatus)

}

router.put('/user/:id/alliedgame1', answeredWrong)

async function resetAnswer (req, res) {
  const user = await User.findByPk(req.params.id)
  const updateStatus = await user.update({
    answered: false })

  await update()

  return res.send(updateStatus)

}

router.put('/user/:id/resetAnswer', resetAnswer)

async function resetUser (req, res) {
  const user = await User.findByPk(req.params.id)
  const updateStatus = await user.update({
    answered: false, score: 0, allies: false, roomId: null })

  await update()

  return res.send(updateStatus)

}

router.put('/user/:id/resetUser', resetUser)

return router

}


module.exports = factory