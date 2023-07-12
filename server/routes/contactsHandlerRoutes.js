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
   setRestoreMultipleContactsFromTrash
} = require('../controllers/contactRequestHandlers/index')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewLabel)
router.put('/editLabel',editUserLabel)
router.delete('/removeLabel',removeUserLabel)
router.post('/manageUserContactLabels',manageUserContactsLabels)
router.delete('/deleteContact',setTrashContactHandler)
router.delete('/deleteMultiple',setDeleteMultiSelectedContacts)
router.post('/manageMultipleContactsLabels',setManageMultiContactLabels)
router.put('/interact',setFavourited)
router.put('/hideContact',setHideContactHandler)
router.put('/hideMultipleContacts',setHideMultipleContacts)
router.put('/setEdittedContact',setEdittedContact)
router.put('/restoreFromTrash',setRestoreFromTrash)
router.put('/restoreMultipleFromTrash',setRestoreMultipleContactsFromTrash)


module.exports = router;