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

 
   try { 
      if (!contactId || !uid) {
         response.status(400)
         throw new Error('USER UID OR CONTACT ID WAS NOT PROVIDED')
      }

      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },
         { $set: { 'contacts.$.inFavourites': status } },
         { new: true }
      )
 
      if (!updatedAuthUserData) {
         response.status(400)
         throw new Error('NO CONTACT OF SUCH ID FOUND')
         return;
      }

      const interactedContact = updatedAuthUserData.contacts.find(contact => contact._id.toString() === contactId.toString());

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
      return;
   }

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid, })

      const contact = authUserDataDoc.contacts.find(c => c._id.toString() === contactId)

      if(!contact){
         response.status(404)
         throw new Error("CONTACT WITH SPECIFIED ID WAS NOT FOUND")
         return;
      }

      const labelAlreadyExists = contact.labelledBy.find(
         (labelObj) => labelObj.label === label
      )
      if (!labelAlreadyExists && actionType === "add") {
         await AuthUser.findOneAndUpdate(
            { uid, 'contacts._id': contact._id },
            { $push: { 'contacts.$.labelledBy': { label } } }
         )
      }
      else if(labelAlreadyExists && actionType === "remove"){
         await AuthUser.findOneAndUpdate(
            { uid, 'contacts._id': contact._id },
            { $pull: { 'contacts.$.labelledBy': { label } } }
         )
      }

      const contactIndex = authUserDataDoc.findIndex(c => c._id.toString() === contactId)
      authUserDataDoc.contacts[contactIndex] = {
         ...authUserDataDoc.contacts[contactIndex],

      }
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
         return;
      }
      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },
         { $set: { 'contacts.$.isHidden': status } },
         { new: true }
      )

      if (!updatedAuthUserData) {
         response.status(404)
         throw new Error('NO USER WHICH SUCH ID')
         return;
      }
      
      const updatedContact = authUserDataDoc.contacts.find(contact => contact._id.toString() === contactId.toString())
      response.status(200).json(updatedContact)
   } 
   catch (error) {
      response.status(500)
      throw new Error(error.message)
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
 
      const contactIndex = user.contacts.findIndex((contact) => contact._id.toString() === contactId)
   
      if (contactIndex === -1) {
         return res.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      authUserDataDoc.contacts[contactIndex] = {
         ...authUserDataDoc.contacts[contactIndex],
         inTrash: true
         deletedAt: new Date()
      }
   
      const updatedContact = authUserDataDoc.contacts.find(contact => contact._id.toString() === contactId.toString())
      await authUserDataDoc.save()
   
      response.status(200).json(updatedContact)
   } 
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})




const setRestoreFromTrash = asyncHandler(async(request,response) => {
   const { uid, contactId } = request.query;
 
   try {
      const authUserDataDoc = await AuthUserData.findOne({ uid })
   
      if (!authUserDataDoc) {
         response.status(404)
         throw new Error("NO USER WITH PROVIDED ID WAS FOUND")
         return;
      }
 
      const contactIndex = user.contacts.findIndex((contact) => contact._id.toString() === contactId)
   
      if (contactIndex === -1) {
         return res.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      authUserDataDoc.contacts[contactIndex] = {
         ...authUserDataDoc.contacts[contactIndex],
         inTrash: false
         deletedAt: null
      }
   
      await authUserDataDoc.save()
   
      response.status(200).end()
   } 
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})




const setEdittedContact = async (req, res) => {
   const { uid, contactId } = req.query;
   const edittedContactDetails = req.body;
 
   try {
      const user = await AuthUserData.findOne({ uid })
   
      if (!user) {
         return res.status(404)
         throw new Error("USER WITH SPECIFIED UID DOES NOT EXIST")
      }
 
      const contactIndex = user.contacts.findIndex((contact) => contact._id.toString() === contactId);
   
      if (contactIndex === -1) {
         return res.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
      }
   
      // Update the contact with the new data
      user.contacts[contactIndex] = {
         ...user.contacts[contactIndex],
         ...edittedContactDetails,
      }
 
     await user.save()
 
     return res.status(200).json({ message: 'Contact updated successfully' })
   } 
   
   catch (error) {
     return res.status(500)
     throw new Error(err.message)
   }
}
 
 

module.exports = {
   setDeleteContactHandler,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash
}