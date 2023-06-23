const asyncHandler = require('express-async-handler')
const AuthUserData = require('../models/AuthUserData')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = req.query.uid;

   if(!authUserUid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }

   try{
      const newUserContact = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
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
const getAuthUserData = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;

   try{
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      if (!authUserDataDoc){
         // Initialize User In Database
         await AuthUserData.create({
            uid: authUserUid,
            contacts: [],
            labels: []
         })
      }
      
      response.status(200).json({
         uid: authUserDataDoc.uid,
         contacts: authUserDataDoc.contacts,
         labels: authUserDataDoc.labels
      })
   }
   catch(error){
      response.status(500)
      throw new Error(`Error Occured Fetching Resource... ${err.message}`)
   }
})



// Set New Contact Label
const setNewLabel = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const newLabel = request.body;

   try{
      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid: authUserUid },
         { $push: { labels: newLabel } },
         { new: true }
      )

      res.status(201).json(updatedAuthUserData.labels)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})


// // Handle Auth User Update Request
// const setUpdate = asyncHandler(async(request,response) => {

//    const authUserUid = request.query.uid;
//    const { contactId } = request.query;
//    const { updatedContactsData } = request.body;

//    if(!updatedContactsData){
//       response.status(400)
//       throw new Error("BAD REQUEST, INVALID UPDATE FIELDS")
//    }

//    try{
//       const updatedDocument = await AuthUserData.findOneAndUpdate(
//          { uid, "contacts._id": contactId },
//          { $set: { "contacts.$": updatedContactsData } },
//          { new: true }
//       )

//       response.status(201).json(updatedDocument)
//    }

//    catch(error){
//       response.status(500)
//       throw new Error(`Error Updating Data,... ${err.message}`)
//    }
// })


module.exports = {
   getAuthUserData,
   createContact,
   setNewLabel
}