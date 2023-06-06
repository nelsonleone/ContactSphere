const firebaseAdmin = require('firebase-admin')
const AuthFirebaseServiceKey = require('../AuthServiceKeyFile')

firebaseAdmin.initializeApp({
   credential: admin.credential.cert(AuthFirebaseServiceKey)
})

module.exports = firebaseAdmin;