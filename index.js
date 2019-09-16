const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

const login = require('./auth/router')
app.use(login)

const app = express()

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

const port = process.env.PORT || 4000

app.listen(port, () => console.log('PORT on:', port))