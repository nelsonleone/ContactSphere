const {
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   setRestoreMultipleContactsFromTrash
} = require('./multipleRequest')
const {
   setDeleteContactHandler,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash
} = require('./singleRequest')

module.exports = {
   setDeleteContactHandler,
   setHideContactHandler,
   setFavourited,
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