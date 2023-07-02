const mongoose = require('mongoose')
const {
   Schema,
   model
} = mongoose;

const Contact = new Schema({
   address: {
      country: String,
      state: String,
      city: String,
      street: String,
      postalCode: Number
   },
   birthday:  Date,
   chat: String,
   companyName: String,
   department: String,
   email: String,
   firstName: String,
   inTrash: Boolean,
   isHidden: Boolean,
   inFavourites: Boolean,
   deletedAt: Date,
   isHidden: Boolean,
   jobTitle: String,
   lastName: String,
   labelledBy: [
      {
         label: String
      }
   ],
   middleName: String,
   nickname: String,
   phoneNumber: String,
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
},{ timestamps: true })

const labelsSchema = new Schema({
   label: String
})

const authUserSchema = new Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   contacts: [Contact],
   labels: [labelsSchema]
})


authUserSchema.pre('save', function (next) {
   const contacts = this.contacts;
 
   for (let i = 0; i < contacts.length; i++) {
     const contact = contacts[i]
 
      if (contact) {
         const { firstName, lastName, prefix, suffix } = contact;
   
         contact.name = `${prefix} ${firstName} ${lastName} ${suffix}`;
      }
   }
   next()
})
 


const AuthUserData = model('AuthUserData',authUserSchema,'authuserdata')

module.exports = AuthUserData;