const express = require('express')
const router = express.Router()
const {
   getAuthUserData,
   setNewLabel,
   createContact,
   setDeleteContactHandler,
   setFavourited,
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels
} = require('../controllers/contactsHandlerController')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewLabel)
router.delete('/deleteContact',setDeleteContactHandler)
router.delete('/deleteMultiple',setDeleteMultiSelectedContacts)
router.put('/manageMultipleContactsLabels',setManageMultiContactLabels)
router.put('/interact',setFavourited)


module.exports = router;