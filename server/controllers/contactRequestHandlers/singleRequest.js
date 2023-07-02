const asyncHandler = require('express-async-handler')
const AuthUserData = require('../../models/AuthUserData')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const newContact = { ...request.body, inTrash: false,inFavourites: false,isHidden: false }

   if(!authUserUid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }

   try{
      const authUserDataDoc = await AuthUserData.find({ uid: authUserUid })

      // User Doc Has Already Been Initialized
      if(authUserDataDoc){
         const newAuthUserData = await AuthUserData.findOneAndUpdate(
            { uid: authUserUid },
            { $push: { contacts: newContact } },
            { new: true }
         )
      }

      else{
         await AuthUserData.create({
            uid: authUserUid,
            contacts: [],
            labels: []
         })
      }

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
      const currentDate = new Date()
      const diffInDate = new Date()
      diffInDate.setDate(diffInDate.getDate() - 30)
      let authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if (!authUserDataDoc){
         // Initialize User In Database
         authUserDataDoc = await AuthUserData.create({
            uid: authUserUid,
            contacts: [],
            labels: []
         })

         response.status(201).json(authUserDataDoc)
         return;
      }

      // Remove Contacts In Trash Which Has Exceed The Time Mark
      const contacts = authUserDataDoc.contacts.filter(contact => (
         !contact.deletedAt || contact.deletedAt.getTime() > diffInDate.getTime()
      ))
      
      response.status(200).json({
         uid: authUserDataDoc.uid,
         contacts,
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

      const updatedContact = await AuthUserData.find({uid,'contacts._id': contactId})
      response.status(200).json(updatedContact)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})




// Handle Single Contact Hide
const setHideContactHandler = asyncHandler(async(request,response) => {
   const {
      uid,
      contactId
   } = request.query;
   const { status } = request.body;
   
   try {
      if(!uid || !contactId){
         response.status(400)
         throw new Error("INVALID OR INCOMPLETE QUERY PARAMETERS PASSED")
      }
      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },
         { $set: { 'contacts.$.isHidden': status } },
         { new: true }
      )

      if (!updatedAuthUserData) {
         response.status(404)
         throw new Error('NO USER WHICH SUCH ID')
      }
      
      const updatedContact = authUserDataDoc.contacts.find(contact => contact._id === contactId)
      response.status(200).json(updatedContact)
   } 
   catch (error) {
      response.status(500)
      throw new Error('No user or contact found')
   }
})



// Handle Single Contact Delete
const setDeleteContactHandler = asyncHandler(async (request, response) => {
   const { uid, contactId } = request.query;
 
   try {
      const authUserDataDoc = await AuthUserData.findOne({ uid })
   
      if (!authUserDataDoc) {
         response.status(404)
         throw new Error("NO USER WITH PROVIDED ID WAS FOUND")
         return;
      }
 
      const contact = authUserDataDoc.contacts.find(
         (contact) => contact._id.toString() === contactId
      )
   
      if (!contact) {
         response.status(404)
         throw new Error("NO CONTACT WITH SUCH ID WAS FOUND")
         return;
      }
   
      contact.inTrash = true
      contact.deletedAt = new Date()
   
      const updatedContact = authUserDataDoc.contacts.find(contact => contact._id === contactId)
      await authUserDataDoc.save()
   
      response.status(200).json(updatedContact)
   } 
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})
 

module.exports = {
   setDeleteContactHandler,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels
}