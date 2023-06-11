const mongoose = require('mongoose')
const {
   Schema,
   model,
   models
} = mongoose;

const Contact = new Schema({
   Address: {
      country: String,
      city: String,
      street: String
   },
   email: String,
   companyName: String,
   inTrash: Boolean,
   isActive: Boolean,
   isHidden: Boolean,
   jobTitle: String,
   labelledBy: String,
   name: {
      type: String,
      required: true
   },
   phoneNumber: Number,
   repPhoto: Buffer
})

const userContactsSchema = new Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   contacts: [Contact]
})


const UserContacts = model('UserContacts',userContactsSchema,'usercontacts')

module.exports = UserContacts;