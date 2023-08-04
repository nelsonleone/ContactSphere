const asyncHandler = require('express-async-handler')
const AuthUserData = require('../../models/AuthUserData')
const { checkForUid, checkIfUserExists } = require('./onRequestHelperFns/index')


// Handle Multi Contact Delete
const setTrashMultiSelectedContacts = asyncHandler(async (request, response) => {
   const contactIds = request.body.selectedContacts;
   const { uid } = request.query;

   try {
      await checkForUid(response,uid)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      for (const contactId of contactIds ){
         const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId)
         authUserDataDoc.contacts[contactIndex].inTrash = true;
         authUserDataDoc.contacts[contactIndex].deletedAt = new Date()
      }

      await authUserDataDoc.save()

      response.status(200).json({ message: 'Contacts deleted successfully' })
   } 

   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
})



const setRestoreMultipleContactsFromTrash = asyncHandler(async(request,response) => {
   const contactIds = request.body.selectedContacts;
   const { uid } = request.query;

   try {
      await checkForUid(response,uid)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      for (const contactId of contactIds ){
         const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId)
         authUserDataDoc.contacts[contactIndex].inTrash = false;
         authUserDataDoc.contacts[contactIndex].deletedAt = null;
      }

      await authUserDataDoc.save()

      response.status(200).json({ message: 'Contacts Restored successfully' })
   } 

   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
})
 



// Handle Multi Manage Label
const setManageMultiContactLabels = asyncHandler(async (request, response) => {
   const { selectedContacts:contactIds, label } = request.body;
   const { uid } = request.query;

   try {
      await checkForUid(response,uid)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      // Find contacts with matching _ids
      const matchedContacts = authUserDataDoc.contacts.filter((contact) =>
         contactIds.includes(contact._id.toString())
      )

      // Update the labelledBy array for each matched contact
      for (const contact of matchedContacts) {

         const labelAlreadyExists = contact.labelledBy.find(
           (labelObj) => labelObj.label === label
         )

         if (!labelAlreadyExists) {
            await AuthUserData.findOneAndUpdate(
               { uid, 'contacts._id': contact._id },
               { $push: { 'contacts.$.labelledBy': { label } }}
            )
         }
      }
      
      response.status(201).json({ message: 'Contacts Labels updated successfully' })
   } 
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 




// Handle Multiple Contacts Hiding
const setHideMultipleContacts = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { selectedContacts: contactIds, status } = request.body;
   
   try {
      await checkForUid(response,uid)
      
      for (const contactId of contactIds){
         const query = { uid, 'contacts._id': contactId }
         const update = { $set: { 'contacts.$.isHidden': status } }

         await AuthUserData.findOneAndUpdate(query, update)
      }
      
      response.status(200).json({ message: "Request Was Successful" })
   }
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 






// Handle Multiple Contacts Permanent Delete
const setDeleteMultipleContacts = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { selectedContacts: contactIds } = request.body;
   
   try {
      await checkForUid(response,uid)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      authUserDataDoc.contacts = authUserDataDoc.contacts.filter(c => {
         return !contactIds.includes(c._id.toString())
      })

      response.status(200).json({ message: "Selected Contacts Are Now Permanently Deleted" })
   }
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 





// Handle Contacts Merge and Fix
const setMergeDuplicates = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { duplicatesIds } = request.body;
   
   try {
      await checkForUid(response,uid)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      const aboutToBeMerged = authUserDataDoc.contacts.filter(c => duplicatesIds.includes(c._id.toString()))



      response.status(200).json({ message: "Selected Contacts Are Now Permanently Deleted" })
   }
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 


module.exports = {
   setTrashMultiSelectedContacts,
   setDeleteMultipleContacts,
   setManageMultiContactLabels,
   setHideMultipleContacts,
   setRestoreMultipleContactsFromTrash,
   setMergeDuplicates
}