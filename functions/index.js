require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const authRouter = require('./auth')

const app = express()

app.use(cors({ origin: true }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send('Api running')
})

app.use('/api/auth', authRouter)

exports.app = functions.https.onRequest(app)
