const asyncHandler = require('express-async-handler')
const AuthUserData = require('../../models/AuthUserData')
const capitalizeString = require('../../utils/capitalizeString')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const newContact = { 
      ...request.body, 
      inTrash: false,
      inFavourites: false,
      isHidden: false, 
      firstName: capitalizeString(request.body.firstName),
      lastName: capitalizeString(request.body.lastName),
      middleName: capitalizeString(request.body.middleName)
   }

   if(!authUserUid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if(!authUserDataDoc){
         response.status(400)
         throw new Error("NO USER WITH SPECIFIED UID WAS FOUND")
         return;
      }

      // User Doc Has Already Been Initialized
      const newAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
         { $push: { contacts: newContact } },
         { new: true }
      )

      response.status(201).json({
         message: "Contact Created Successfully"
      })
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
         if(authUserUid){
            // Initialize User In Database
            authUserDataDoc = await AuthUserData.create({
               uid: authUserUid,
               contacts: [],
               labels: []
            })
               
            response.status(201).json(authUserDataDoc)
         }
         else{
            response.status(400)
            throw new Error("INVALID QUERY PARAMTER PASSED")
         }
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
   const labelToAdd = request.body;
   const newLabelObj = {...labelToAdd,label: capitalizeString(labelToAdd.label)}



   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if(authUserDataDoc){
         response.status(400)
         throw new Error("NO USER WITH SPECIFIED UID WAS FOUND")
         return;
      }

      const labelAlreadyExists = authUserDataDoc.labels.some(val => val.label === capitalizeString(newLabelObj.label))

      // Don't Add Label If It Already Exist
      if (labelAlreadyExists){
         response.status(204).end()
         return;
      }

      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
         { $push: { labels: newLabelObj } },
         { new: true }
      )

      response.status(201).json(updatedAuthUserData.labels)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})


// Remove Auth User Saved Label
const removeUserLabel = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const labelForDelete = {...request.body,label: capitalizeString(request.body.label)}

   try{
      if(!uid){
         response.status(400)
         throw new Error("INVALID QUERY PARAMETERS PASSED")
      }

      if(!labelForDelete){
         response.status(400)
         throw new Error(`REQUEST BODY HAS INCOMPLETE PROPERTIE 'LabelForDelete was not specified'`)
      }

      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if(!authUserDataDoc){
         response.status(404)
         throw new Error("USER WITH SPECIDED UID WAS NOT FOUND")
      }  

      authUserDataDoc.labels.filter(v => v.label !== labelForDelete.label)
      // UPDATE CONTACTS WITH LABEL IN LABELLEDBY ARRAY
      authUserDataDoc.contacts = authUserDataDoc.contacts.map(c => {
         return {
            ...c,
            labelledBy: c.labelledBy.filter(v => {
               return v.label !== labelForDelete.label
            })
         }
      })
      authUserDataDoc.save()
      response.status(201).json(authUserDataDoc.labels)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})


// Edit User Saved Labels
const editUserLabel = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const { labelForEditObj, oldLabel } = request.body;

   try{
      if(!uid){
         response.status(400)
         throw new Error("INVALID QUERY PARAMETERS PASSED")
      }

      if(!labelForEditObj || !oldLabel){
         response.status(400)
         throw new Error(`REQUEST BODY HAS INCOMPLETE PROPERTIES 'oldLabel Property Or LabelForEditObj Property was not provided`)
      }

      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if(!authUserDataDoc){
         response.status(404)
         throw new Error("USER WITH SPECIDED UID WAS NOT FOUND")
         return;
      }  

      const labelIndex = authUserDataDoc.labels.findIndex(v => v._id === labelForEditObj._id)
      authUserDataDoc.labels[labelIndex] = {...authUserDataDoc.labels[labelIndex],label: capitalizeString(labelForEditObj.label)}

      // UPDATE CONTACTS WITH LABEL IN LABELLEDBY ARRAY
      authUserDataDoc.contacts = authUserDataDoc.contacts.map(c => {
         return {
            ...c,
            labelledBy: c.labelledBy.map(v => {
               return v.label === oldLabel ? {...v,label:capitalizeString(labelForEditObj.label)} : v
            })
         }
      })

      authUserDataDoc.save()
      response.status(201).end()
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
         return;
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

   const value = request.body;

   if (!contactId || !uid ) {
      response.status(400)
      throw new Error('USER UID OR CONTACT ID WAS NOT PROVIDED')
      return;
   }

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid, })

      if(!authUserDataDoc){
         response.status(404)
         throw new Error("")
         return;
      }

      const contact = authUserDataDoc.contacts.find(c => c._id.toString() === contactId)

      if(!contact){
         response.status(404)
         throw new Error("CONTACT WITH SPECIFIED ID WAS NOT FOUND")
         return;
      }

      const labelAlreadyExists = contact.labelledBy.find(
         (labelObj) => labelObj.label === value.label
      )

      if (!labelAlreadyExists && actionType === "add") {
         await AuthUserData.findOneAndUpdate(
            { uid, 'contacts._id': contact._id },
            { $push: { 'contacts.$.labelledBy': value }}
         )
      }
      else if(labelAlreadyExists && actionType === "remove"){
         await AuthUserData.findOneAndUpdate(
            { uid, 'contacts._id': contact._id },
            { $pull: { 'contacts.$.labelledBy': value } }
         )
      }

      const updatedContactUserDataDoc = await AuthUserData.findOne({ uid })
      const updatedContact = updatedContactUserDataDoc.contacts.find(c => c._id.toString() === contact._id.toString())

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

      const authUserDataDoc = await AuthUserData.findOne({uid})

      if (!authUserDataDoc) {
         response.status(404)
         throw new Error("NO USER WITH PROVIDED ID WAS FOUND")
         return;
      }
 
      const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId.toString())
   
      if (contactIndex === -1) {
         return res.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      authUserDataDoc.contacts[contactIndex] = {
         ...authUserDataDoc.contacts[contactIndex],
         isHidden: status,
         // Once A contact Is Hidden , It's No Longer Starred
         inFavourites: status === true ? false : authUserDataDoc.contacts[contactIndex].inFavourites
      }

      await authUserDataDoc.save()
   
      response.status(200).json({
         message: status === true ? "Contact Hidden Successfully" : "Contact Unhidden"
      })
   } 
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
})



// Handle Single Contact Delete
const setTrashContactHandler = asyncHandler(async (request, response) => {
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
         inTrash: true,
         deletedAt: new Date()
      }
   
      await authUserDataDoc.save()
   
      response.status(200).json({
         message: "Contact Sent To Trash"
      })
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
         inTrash: false,
         deletedAt: null
      }
   
      await authUserDataDoc.save()
   
      response.status(200).json({
         message: "Contact Restored From Trash"
      })
   } 
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})




const setEdittedContact = async (request, response) => {
   const { uid, contactId } = request.query;
   const edittedContactDetails = { 
      ...request.body, 
      inTrash: false,
      inFavourites: false,
      isHidden: false, 
      firstName: capitalizeString(request.body.firstName),
      lastName: capitalizeString(request.body.lastName),
      middleName: capitalizeString(request.body.middleName)
   }
 
   try {
      const AuthUserDataDoc = await AuthUserData.findOne({ uid })
   
      if (!AuthUserDataDoc) {
         return response.status(404)
         throw new Error("USER WITH SPECIFIED UID DOES NOT EXIST")
      }
 
      const contactIndex = AuthUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId.toString())
   
      if (contactIndex === -1) {
         response.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      // Update the contact with the new data
      const { createdAt } = AuthUserDataDoc.contacts[contactIndex]
      AuthUserDataDoc.contacts[contactIndex] = {
         ...user.contacts[contactIndex],
         ...edittedContactDetails,
         createdAt
      }
 
     await AuthUserDataDoc.save()
 
     response.status(200).json({ message: 'Contact updated successfully' })
   } 
   
   catch (error) {
     response.status(500)
     throw new Error(err.message)
   }
}
 
 

module.exports = {
   setTrashContactHandler,
   setFavourited,
   getAuthUserData,
   createContact,
   setHideContactHandler,
   setNewLabel,
   manageUserContactsLabels,
   setEdittedContact,
   setRestoreFromTrash,
   removeUserLabel,
   editUserLabel
}