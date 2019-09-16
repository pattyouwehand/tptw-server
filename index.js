const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const userFactory = require(
  './user/router'
)
const user = require(
  './user/model'
)
const Sse = require('json-sse')

const login = require('./auth/router')
app.use(login)

const roomFactory = require('./room/router')
const Room = require('./room/model')

const stream = new Sse()

const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)


const userRouter = userFactory(
  )
  app.use(userRouter)

async function serialize () {
  const rooms = await Room.findAll({})

  return JSON.stringify(rooms)
} 

async function update () {
  const data = await serialize()
  
  stream.send(data)
}

async function onStream (req, res) {
  const data = await serialize()

  stream.updateInit(data)
  return stream.init(req, res)
}

app.get('/stream', onStream)

const roomRouter = roomFactory(update)
app.use(roomRouter)


const port = process.env.PORT || 4000

app.listen(port, () => console.log('PORT on:', port))