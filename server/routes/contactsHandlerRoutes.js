const express = require('express')
const router = express.Router()
const {
   setTrashContactHandler,
   setHideContactHandler,
   setFavourited,
   setNewLabel,
   createContact,
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   manageUserContactsLabels,
   getAuthUserData,
   editUserLabel,
   setEdittedContact,
   setRestoreFromTrash,
   removeUserLabel,
   setDeleteContact,
   setDeleteMultipleContacts,
   setRestoreMultipleContactsFromTrash
} = require('../controllers/contactRequestHandlers/index')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewLabel)
router.put('/editUserLabel',editUserLabel)
router.delete('/removeLabel',removeUserLabel)
router.delete('/deleteContact',setDeleteContact)
router.delete('/deleteMultiple',setDeleteMultipleContacts)
router.post('/manageUserContactLabels',manageUserContactsLabels)
router.delete('/sendToTrash',setTrashContactHandler)
router.delete('/sendMultipleToTrash',setDeleteMultiSelectedContacts)
router.post('/manageMultipleContactsLabels',setManageMultiContactLabels)
router.put('/interact',setFavourited)
router.put('/hideContact',setHideContactHandler)
router.put('/hideMultipleContacts',setHideMultipleContacts)
router.put('/setEdittedContact',setEdittedContact)
router.put('/restoreFromTrash',setRestoreFromTrash)
router.put('/restoreMultipleFromTrash',setRestoreMultipleContactsFromTrash)


module.exports = router;