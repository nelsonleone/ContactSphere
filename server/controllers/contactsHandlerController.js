const asyncHandler = require('express-async-handler')
const AuthUserData = require('../models/AuthUserData')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const newContact = { ...request.body, inTrash: false,inFavourites: false,isHidden: false }

   if(!authUserUid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }

   try{
      const newAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
         { $push: { contacts: newContact } },
         { new: true }
      )

      response.status(201).end()
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})



// Set Auth User Contacts
const getAuthUserData = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if (!authUserDataDoc){
         // Initialize User In Database
         const authUserDataDoc = await AuthUserData.create({
            uid: authUserUid,
            contacts: [],
            labels: []
         })

         response.status.json(authUserDataDoc)
         return;
      }
      
      response.status(200).json({
         uid: authUserDataDoc.uid,
         contacts: authUserDataDoc.contacts,
         labels: authUserDataDoc.labels
      })
   }
   catch(error){
      response.status(500)
      throw new Error(`Error Occured Fetching Resource... ${error.message}`)
   }
})



// Set New Contact Label
const setNewLabel = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const newLabel = request.body;

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })
      const labelAlreadyExists = authUserDataDoc.labels.some(val => val.label === newLabel.label)

      // Don't Add Label If It Already Exist
      if (labelAlreadyExists){
         response.status(204).end()
         return;
      }

      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
         { $push: { labels: newLabel } },
         { new: true }
      )

      response.status(201).json(updatedAuthUserData.labels)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})



// Add Selected Contact To  Favourites
const setFavourited = asyncHandler(async (request, response) => {
   const { uid, contactId } = request.query;
   const { status } = request.body;
 
   if (!contactId || !uid) {
     response.status(400)
     throw new Error('USER UID OR CONTACT ID WAS NOT PROVIDED')
   }
 
   try {
      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },
         { $set: { 'contacts.$.isFavourited': status } },
         { new: true }
      )
 
      if (!updatedAuthUserData) {
         response.status(400)
         throw new Error('NO CONTACT OF SUCH ID FOUND')
      }

      const interactedContact = updatedAuthUserData.contacts.find(contact => contact._id === contactId)
 
     response.status(200).json(interactedContact)
   } 
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})



// Manage Contacts Labels 
const manageUserContactsLabels = asyncHandler(async(request,response) => {
   const {
      actionType,
      uid,
      contactId
   } = request.query;

   const label = request.body;

   if (!contactId || !uid ) {
      response.status(400)
      throw new Error('USER UID OR CONTACT ID WAS NOT PROVIDED')
   }

   let queryObj  = {}
   if (actionType === "add"){
      queryObj =  { $push: { 'contacts.$.labelledBy': label } }
   }

   else if( actionType === "remove"){
      queryObj = { $pull: { 'contacts.$.labelledBy': label } }
   }

   // ActionType Was Not Provided or Invalid
   else{
      queryObj =  { $push: { 'contacts.$.labelledBy': label } }
   }

   try{
      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },queryObj,{ new: true }
      )
      response.status(200).end()
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})



// Handle Single Contact Delete
const setDeleteContactHandler = asyncHandler(async(request,response) => {
   const { contactId } = request.body;
   const { uid } = request.query;    
   try {
      const authUser = await AuthUser.findOne({ uid })
   
      if (!authUser) {
         response.status(404)
         throw new Error("NO USER WITH PROVIDED ID WAS FOUND")
         return;
      }
   
      // Find the index of the contact with the specified contactId
      const contactIndex = authUser.contacts.findIndex(
         (contact) => contact._id.toString() === contactId
      )
   
      if (contactIndex === -1) {
         response.status(404)
         throw new Error("NO CONTACT WITH SUCH ID WAS FOUND")
         return;
      }
      authUser.contacts.splice(contactIndex, 1)
   
      await authUser.save()
   
      response.status(200).json({ message: 'Contact deleted successfully' });
   } 
   
   catch (error) {
      response.status(500).json({ message: 'Server error' });
   }
    
})


// Handle Multi Contact Delete
const setDeleteMultiSelectedContacts = asyncHandler(async(request,response) => {
   const { uid, contactIds } = request.query;
   
   try {
      if (!contactId || !uid ) {
         response.status(400)
         throw new Error('USER UID OR CONTACT ID WAS NOT PROVIDED')
      }

      const authUser = await AuthUser.findOne({ uid })
   
      if (!authUser) {
         throw new Error('NO USER WITH PROVIDED ID FOUND')
         return;
      }
   
      authUser.contacts = authUser.contacts.filter(
         (contact) => !contactIds.includes(contact._id.toString())
      )
   
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
   const { contactIds, label } = request.body;
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

      response.status(200).json({ message: 'Contacts Labels updated successfully' })
   } catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
} 


module.exports = {
   getAuthUserData,
   createContact,
   setNewLabel,
   setManageMultiContactLabels,
   setDeleteMultiSelectedContacts,
   setDeleteContactHandler,
   setFavourited,
}