const {
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   setRestoreMultipleContactsFromTrash,
   setDeleteMultipleContacts
} = require('./multipleRequest')
const {
   setTrashContactHandler,
   setDeleteContact,
   editUserLabel,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash,
   removeUserLabel
} = require('./singleRequest')

module.exports = {
   setTrashContactHandler,
   setHideContactHandler,
   setFavourited,
   editUserLabel,
   removeUserLabel,
   setNewLabel,
   getAuthUserData,
   createContact,
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash,
   setRestoreMultipleContactsFromTrash,
   setDeleteContact,
   setDeleteMultipleContacts
}