const asyncHandler = require('express-async-handler')
const UserContacts = require('../models/UserContacts')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = req.query.uid;

   if(!authUserUid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }

   try{
      const newUserContact = await UserContacts.findOneAndUpdate(
         { uid },
         { $push: { contacts: newContact } },
         { new: true }
      )

      console.log(newUserContact)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})



// Set Auth User Contacts
const setAuthUserContacts = asyncHandler(async(request,response) => {
   const authUserUid = req.query.uid;

   try{
      const userContactsDoc = await UserContacts.findOne({ uid: authUserUid })

      if (!userContactsDoc){
         response.status(200).json({
            contacts: []
         })
      }

      const contacts = userContactsDoc.contacts;
      response.status(200).json(contacts)
   }
   catch(error){
      response.status(500)
      throw new Error(`Error Occured Fetching Resource... ${err.message}`)
   }
})


// Handle Auth User Update Request
const setUpdate = asyncHandler(async(request,response) => {

   const authUserUid = request.query.uid;
   const { contactId } = request.query;
   const { updatedContactsData } = request.body;

   if(!updatedContactsData){
      response.status(400)
      throw new Error("BAD REQUEST, INVALID UPDATE FIELDS")
   }

   try{
      const updatedDocument = await UserContacts.findOneAndUpdate(
         { uid, "contacts._id": contactId },
         { $set: { "contacts.$": updatedContactsData } },
         { new: true }
      )

      response.status(201).json(updatedDocument)
   }

   catch(error){
      response.status(500)
      throw new Error(`Error Updating Data,... ${err.message}`)
   }
})


module.exports = {
   setUpdate,
   setAuthUserContacts,
   createContact
}