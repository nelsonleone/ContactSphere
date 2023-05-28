const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const validator = require('validator')
const bcrypt = require('bcryptjs')


const authUserSchema = new Schema({
   displayName: {
      type: String,
      required: true,
   },

   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: validator.isEmail,
         message: 'Invalid email address',
      }
   },

   password: {
      type: String,
      required: true
   }
})


// hash passwords in database
authUserSchema.pre('save',async function(next){
   if(!this.isModified('password')){
      next()
   }
   const password = this.password;
   const salt = await bcrypt.genSalt(13)
   const hashedPassword = await bcrypt.hash(this.password,salt)

   this.password = hashedPassword;
})

const AuthUser = model('AuthUser',authUserSchema)

module.exports = AuthUser;