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
   chat: String,
   companyName: String,
   department: String,
   firstName: String,
   inTrash: Boolean,
   isActive: Boolean,
   isHidden: Boolean,
   jobTitle: String,
   lastName: String,
   labelledBy: String,
   middleName: String,
   name: {
      type: String,
      required: true
   },
   nickname: String,
   postalCode: String,
   phoneNumber: Number,
   notes: String,
   prefix: String,
   repPhoto: String,
   relatedPeople: [
      {
         name: String,
         label: String
      }
   ],
   suffix: String,
   website: String,
})

const userContactsSchema = new Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   contacts: [Contact]
})


userContactsSchema.pre('save', function(next) {
   this.name = `${this.firstName} ${this.lastName} ${this.middleName}`;
   next()
}) 


const UserContacts = model('UserContacts',userContactsSchema,'usercontacts')

module.exports = UserContacts;