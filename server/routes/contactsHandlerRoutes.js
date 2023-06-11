const express = require('express')
const router = express.Router()
const {
   setUpdate,
   setAuthUserContacts,
   createContact
} = require('../controllers/contactsHandlerController')

router.get('/getAuthUserContacts',setAuthUserContacts)
router.post('/updateContact',setUpdate)
router.post('/createNewContact',createContact)


module.exports = router;