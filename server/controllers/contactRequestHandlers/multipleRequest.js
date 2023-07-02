const asyncHandler = require('express-async-handler')
const AuthUserData = require('../../models/AuthUserData')


// Handle Multi Contact Delete
const setDeleteMultiSelectedContacts = asyncHandler(async (request, response) => {
   const contactIds = request.body.selectedContacts;
   const { uid } = request.query;

   try {
      const authUser = await AuthUser.findOne({ uid })

      if (!authUser) {
         response.status(404);
         throw new Error("NO USER WITH PROVIDED ID WAS FOUND")
         return;
      }

      contactIds.forEach((contactId) => {
         // Find the contact with the specified contactId
         const contact = authUser.contacts.find(
         (contact) => contact._id.toString() === contactId
         )

         if (contact) {
            contact.inTrash = true;
            contact.deletedAt = new Date()
         }
      })

      await authUser.save()

      response.status(200).json({ message: 'Contacts deleted successfully' })
   } 

   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
})
 



// Handle Multi Manage Label
const setManageMultiContactLabels = async (request, response) => {
   const { selectedContacts:contactIds, label } = request.body;
   const { uid } = request.query;

   try {
      const authUser = await AuthUser.findOne({ uid })

      if (!authUser) {
         response.status(404)
         throw new Error("No USER WITH PROVIDED ID WAS FOUND")
         return;
      }

      // Find contacts with matching _ids
      const matchedContacts = authUser.contacts.filter((contact) =>
         contactIds.includes(contact._id.toString())
      )

      // Update the labelledBy array for each matched contact
      matchedContacts.forEach((contact) => {
         const existingLabel = contact.labelledBy.find(
         (labelObj) => labelObj.label === label
         )

         // Add the label if it doesn't exist in the labelledBy array
         if (!existingLabel) {
            contact.labelledBy.push({ label })
         }
      })
      await authUser.save()

      response.status(201).json({ message: 'Contacts Labels updated successfully' })
   } catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
} 




// Handle Multiple Contacts Hiding
const setHideMultipleContacts = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { selectedContacts: contactIds, status } = request.body;

   try {
      const filter = { uid, 'contacts._id': { $in: contactIds } }
      const update = { $set: { 'contacts.$.isHidden': status } }

      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(filter, update, { new: true })

      if (!updatedAuthUserData) {
         throw new Error('USER WITH PROVIDED UID WAS NOT FOUND')
      }

      response.status(200).end()
   } 
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 


module.exports = {
   setDeleteMultiSelectedContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts
}