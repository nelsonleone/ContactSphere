const asyncHandler = require('express-async-handler')
const AuthUserData = require('../../models/AuthUserData')
const capitalizeString = require('../../utils/capitalizeString')
const { 
   checkForUid,
   checkIfUserExists,
   checkForContactId
} = require('./onRequestHelperFns/index')


// Create Contact 
const createContact = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const {
      firstName,
      lastName,
      middleName,
      prefix,
      suffix
   } = request.body;

   const newContact = { 
      ...request.body, 
      inTrash: false,
      inFavourites: false,
      isHidden: false, 
      firstName: capitalizeString(firstName),
      lastName: capitalizeString(lastName),
      middleName: capitalizeString(middleName),
      name: capitalizeString(`${prefix} ${firstName} ${lastName} ${suffix}`),
      address: {
         ...request.body.address,
         country: capitalizeString(request.body.address.country),
         state: capitalizeString(request.body.address.state),
         city: capitalizeString(request.body.address.city),
      }
   }

   try{
      await checkForUid(response,authUserUid)

      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      await checkIfUserExists(response,authUserDataDoc)

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

      await checkForUid(response,authUserUid)

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
         !contact.deletedAt || new Date(contact.deletedAt).getTime() > diffInDate.getTime()
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



// Set New  Label
const setNewLabel = asyncHandler(async(request,response) => {
   const authUserUid = request.query.uid;
   const labelToAdd = request.body;
   const newLabelObj = {...labelToAdd,label: capitalizeString(labelToAdd.label)}



   try{
      await checkForUid(response,authUserUid)
      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })
      await checkIfUserExists(response,authUserDataDoc)
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
      await checkForUid(response,authUserUid)

      if(!labelForDelete){
         response.status(400)
         throw new Error(`REQUEST BODY HAS INCOMPLETE PROPERTIE 'LabelForDelete was not specified'`)
      }

      const authUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })

      await checkIfUserExists(response,authUserDataDoc) 

      authUserDataDoc.labels = authUserDataDoc.labels.filter(v => v.label !== labelForDelete.label)
      // UPDATE CONTACTS WITH LABEL IN LABELLEDBY ARRAY
      authUserDataDoc.contacts = authUserDataDoc.contacts.map(c => {
         return {
            ...c,
            labelledBy: c.labelledBy.filter(v => {
               return v.label !== labelForDelete.label
            })
         }
      })
      
      await authUserDataDoc.save()

      const updatedUserDataDoc = await AuthUserData.findOne({ uid: authUserUid })
      response.status(201).json(updatedUserDataDoc.labels)
   }

   catch(error){
      response.status(500)
      throw new Error(error.message)
   }
})


const editUserLabel = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { labelForEditObj, oldLabel } = request.body;
 
   try {
      await checkForUid(response,uid)
   
      if (!labelForEditObj || !oldLabel) {
         response.status(400);
         throw new Error(
            "REQUEST BODY HAS INCOMPLETE PROPERTIES 'oldLabel Property Or LabelForEditObj Property was not provided"
         )
      }
 
     const authUserDataDoc = await AuthUserData.findOne({ uid })
     await checkIfUserExists(response,authUserDataDoc)
   
      const labelIndex = authUserDataDoc.labels.findIndex(
         (v) => v._id.toString() === labelForEditObj._id.toString()
      )
      authUserDataDoc.labels[labelIndex] = {
         ...authUserDataDoc.labels[labelIndex],
         label: capitalizeString(labelForEditObj.label),
      }
 
     // UPDATE CONTACTS WITH LABEL IN LABELLEDBY ARRAY
     authUserDataDoc.contacts = authUserDataDoc.contacts.map((c) => {
       return {
         ...c,
         labelledBy: c.labelledBy.map((v) => {
           return v.label === oldLabel
             ? { ...v, label: capitalizeString(labelForEditObj.label) }
             : v
         }),
       }
     })
 
     const updatedDoc = new AuthUserData(authUserDataDoc)
     await updatedDoc.save()
 
     response.status(201).end()
   } catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})
 



// Add Selected Contact To  Favourites
const setFavourited = asyncHandler(async (request, response) => {
   const { uid, contactId } = request.query;
   const { status } = request.body;

 
   try { 
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)

      const updatedAuthUserData = await AuthUserData.findOneAndUpdate(
         { uid, 'contacts._id': contactId },
         { $set: { 'contacts.$.inFavourites': status } },
         { new: true }
      )
 
      await checkIfUserExists(response,updatedAuthUserData)

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

   try{
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

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
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)
 
      const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId.toString())
   
      if (contactIndex === -1) {
         response.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }

      // Once A contact Is Hidden , It's No Longer Starred
      authUserDataDoc.contacts[contactIndex].isHidden = status;
      authUserDataDoc.contacts[contactIndex].inFavourites = status === true ? false : authUserDataDoc.contacts[contactIndex].inFavourites;

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
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)
 
      const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId)
   
      if (contactIndex === -1) {
         response.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      authUserDataDoc.contacts[contactIndex].inTrash = true;
      authUserDataDoc.contacts[contactIndex].inFavourites = false;
      authUserDataDoc.contacts[contactIndex].deletedAt = new Date()
   
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





// Restore From Trash Handler
const setRestoreFromTrash = asyncHandler(async(request,response) => {
   const { uid, contactId } = request.query;
 
   try {
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)
 
      const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId)
   
      if (contactIndex === -1) {
         return res.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      authUserDataDoc.contacts[contactIndex].inTrash = false;
      authUserDataDoc.contacts[contactIndex].deletedAt = null;

   
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





// Edit Contact Handler
const setEdittedContact = asyncHandler(async (request, response) => {
   const { uid, contactId } = request.query;
   const {
      firstName,
      lastName,
      middleName,
      prefix,
      suffix
   } = request.body;

   const edittedContactDetails = { 
      ...request.body, 
      inTrash: false,
      inFavourites: false,
      isHidden: false, 
      firstName: capitalizeString(firstName),
      lastName: capitalizeString(lastName),
      middleName: capitalizeString(middleName),
      name: capitalizeString(`${prefix} ${firstName} ${lastName} ${suffix}`),
      address: {
         ...request.body.address,
         country: capitalizeString(request.body.address.country),
         state: capitalizeString(request.body.address.state),
         city: capitalizeString(request.body.address.city)
      }
   }
 
   try {
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)
 
      const contactIndex = authUserDataDoc.contacts.findIndex((contact) => contact._id.toString() === contactId.toString())
   
      if (contactIndex === -1) {
         response.status(404)
         throw new Error("CONTACT WITH PROVIDED ID WAS NOT FOUND")
         return;
      }
   
      // Update the contact with the new data
      authUserDataDoc.contacts[contactIndex] = Object.assign({}, authUserDataDoc.contacts[contactIndex], edittedContactDetails)
 
     await authUserDataDoc.save()
 
     response.status(200).json({ message: 'Contact updated successfully' })
   } 
   
   catch (error) {
     response.status(500)
     throw new Error(error.message)
   }
})



// Handle  Contact Permanent Delete
const setDeleteContact = asyncHandler(async (request, response) => {
   const { uid } = request.query;
   const { contactId } = request.body;
   
   try {
      await checkForUid(response,uid)
      await checkForContactId(response,contactId)
      
      const authUserDataDoc = await AuthUserData.findOne({ uid, })
      await checkIfUserExists(response,authUserDataDoc)

      authUserDataDoc.contacts.filter(c => {
         return contactId.toString() !== c._id.toString()
      })

      response.status(200).json({ message: "Contact Is Permanently Deleted" })
   }
   
   catch (error) {
      response.status(500)
      throw new Error(error.message)
   }
}) 

 
 

module.exports = {
   setTrashContactHandler,
   setDeleteContact,
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