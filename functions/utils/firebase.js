const admin = require('firebase-admin')
const serviceAccount = require('../firebase-adminsdk.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const database = admin.firestore()

module.exports = database
