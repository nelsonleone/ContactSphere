const {
   setTrashMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   setRestoreMultipleContactsFromTrash,
   setDeleteMultipleContacts,
   setMergeDuplicates
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
   setMergeDuplicates,
   setTrashContactHandler,
   setHideContactHandler,
   setFavourited,
   editUserLabel,
   removeUserLabel,
   setNewLabel,
   getAuthUserData,
   createContact,
   setTrashMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash,
   setRestoreMultipleContactsFromTrash,
   setDeleteContact,
   setDeleteMultipleContacts
}