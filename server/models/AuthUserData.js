const mongoose = require('mongoose')
const {
   Schema,
   model
} = mongoose;

const Contact = new Schema({
   Address: {
      country: String,
      state: String,
      city: String,
      street: String,
      postalCode: String
   },
   birthday:  String,
   chat: String,
   companyName: String,
   department: String,
   email: String,
   firstName: String,
   inTrash: Boolean,
   isActive: Boolean,
   isHidden: Boolean,
   jobTitle: String,
   lastName: String,
   labelledBy: [String],
   middleName: String,
   name: {
      type: String,
      required: true
   },
   nickname: String,
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

const authUserSchema = new Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   contacts: [Contact],
   labels: [String]
})


Contact.pre('save', function(next) {
   this.name = `${this.firstName} ${this.lastName} ${this.middleName}`;
   next()
}) 


const AuthUserData = model('AuthUserData',authUserSchema,'authuserdata')

module.exports = AuthUserData;