const express = require('express')
const router = express.Router()

const { CreateNewAccessCodeHandler, ValidateAccessCodeHandler } = require('./controllers/auth.js')

router.route('/login').post(CreateNewAccessCodeHandler)
router.route('/validate-login').post(ValidateAccessCodeHandler)

module.exports = router
