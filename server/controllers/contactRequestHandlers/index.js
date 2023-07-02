const {
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts
} = require('./multipleRequest')
const {
   setDeleteContactHandler,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels
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
   manageUserContactsLabels
}