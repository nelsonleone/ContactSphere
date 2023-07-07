const {
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   setRestoreMultipleContactsFromTrash
} = require('./multipleRequest')
const {
   setDeleteContactHandler,
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
   setDeleteContactHandler,
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
   setRestoreMultipleContactsFromTrash
}