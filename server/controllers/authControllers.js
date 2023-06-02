const AuthUser = require('../models/authUserModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const generateAuthToken = require('../utils/generateAuthToken')

// Handled SignIn Request
const authSignIn = asyncHandler(async (req,res) => {
  if (req.query.method === "email_and_password") {
    const { email, password  } = req.body;
  
    const signedUpUser = await AuthUser.findOne({ email })
  
    if (!signedUpUser){
      res.status(401)
      throw new Error('Invalid Email Address')
    }
  
    const isCorrectPassword = await bcrypt.compare(password,signedUpUser.password)
  
    if (!isCorrectPassword){
      res.status(401)
      throw new Error('Wrong Password')
    }
  
    generateAuthToken(res,signedUpUser._id)
    res.status(200)
  
    res.json({
      displayName: signedUpUser.displayName,
      email: signedUpUser.email,
      _id: signedUpUser._id
    })

  } else if (req.query.method === "google_signin") {
    handleGoogleSignin(req,res)
  }
})



// Handled New User Register
const authSignUp = asyncHandler(async (req,res) => {
  const { email, password, displayName } = req.body;

  if(!email || !pasaword || !displayName){
    res.status(400)
    throw new Error("Invalid Credentials")
  }

  const alreadySignedUp = await AuthUser.findOne({ email })

  if(alreadySignedUp){
    res.status(400)
    throw new Error('User Already Exists')
  }

  const newAuthUser = await AuthUser.create({
    email,
    password,
    displayName
  })

  newAuthUser.save()

  generateAuthToken(res,newAuthUser._id)
  res.status(201).json({
    displayName: newAuthUser.displayName,
    email: newAuthUser.email,
    _id: newAuthUser._id
  })
})



// Handled Signout Request
const authSignOut = (req,res) => {
  res.clearCookie('authToken')

  // fallback
  res.cookie('authToken','',{ expiresIn: new Date(0) })
  res.status(200).send("Signed Out User")
}



const handleGoogleSignin = (req,res) => {
  console.log("hh")
}


module.exports = {
  authSignIn,
  authSignUp,
  authSignOut
}