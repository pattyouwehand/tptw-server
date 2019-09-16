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

const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

const userRouter = userFactory(
  )
  app.use(userRouter)

const port = process.env.PORT || 4000

app.listen(port, () => console.log('PORT on:', port))