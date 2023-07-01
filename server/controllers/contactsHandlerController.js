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

   catch(err){
      response.status(500)
      throw new Error(err.message)
   }
})


module.exports = {
   getAuthUserData,
   createContact,
   setNewLabel
}