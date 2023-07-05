const express = require('express')
const router = express.Router()
const {
   setDeleteContactHandler,
   setHideContactHandler,
   setFavourited,
   setNewLabel,
   createContact,
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   manageUserContactsLabels,
   getAuthUserData,
   setEdittedContact,
   setRestoreFromTrash,
   setRestoreMultipleContactsFromTrash
} = require('../controllers/contactRequestHandlers/index')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewLabel)
router.post('/manageUserContactLabels',manageUserContactsLabels)
router.delete('/deleteContact',setDeleteContactHandler)
router.delete('/deleteMultiple',setDeleteMultiSelectedContacts)
router.post('/manageMultipleContactsLabels',setManageMultiContactLabels)
router.put('/interact',setFavourited)
router.put('/hideContact',setHideContactHandler)
router.put('/hideMultipleContacts',setHideMultipleContacts)
router.put('/setEdittedContact',setEdittedContact)
router.put('/restoreFromTrash',setRestoreFromTrash)
router.put('/restoreMultipleFromTrash',setRestoreMultipleContactsFromTrash)


module.exports = router;