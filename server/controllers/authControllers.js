const asyncHandler = require('express-async-handler')
const firebaseAdmin = require('../firebase/firebaseAdmin')
const verifyIdToken = require('../utils/authAid/verifyIdToken')
const checkCsrfToken = require('../utils/authAid/checkCsrfToken')
const csrfTokenGen = require('../utils/authAid/csrfTokenGen')
const AuthUserData = require('../models/AuthUserData')


// Handled User authorization Request
const authorizeUser = asyncHandler(async (req,res) => {
  const idToken = req.body.idToken.toString()
  
  await checkCsrfToken(req,res)
  await verifyIdToken(res,idToken)


  try {
    const expiresIn = 60 * 60 * 24 * 3 * 1000;
    const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn })
    const options = { 
      maxAge: expiresIn, 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      domain: process.env.DOMAIN,
      url: '/',
      sameSite: 'Strict',
    }

    res.cookie('authSessionCookie', sessionCookie, options)
    res.status(200).end(JSON.stringify({
      message:  "SUCCESS"
    }))
  } 
  
  catch (error) {
    res.status(401)
    throw new Error('UNAUTHORIZED REQUEST!')
  }
})


// set csrfToken to user client device
const setCsrfToken = asyncHandler(async(req,res) => {

  const token = csrfTokenGen()

  const options = { 
    secure: process.env.NODE_ENV === "production", 
    domain: process.env.DOMAIN,
    url: '/',
    sameSite: 'lax',
  }

  res.cookie('csrfToken',token,options)
  res.status(204).end()
})




// Set Auth Session Persistence
const setAuthState = asyncHandler(async(req,res) =>{
  const authSessionToken = req.cookies.authSessionCookie || '';

  try{
    const decodedClaims = await firebaseAdmin.auth().verifySessionCookie(authSessionToken,true)
    const userRecord = await firebaseAdmin.auth().getUser(decodedClaims.uid)
    res.status(200).json({
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      uid: userRecord.uid
    })
  }

  catch(err){
    res.status(401)
    throw new Error(`UNAUTHENTICATED USER`)
  }
})




// Handled Signout Request
const authSignOut = (req,res) => {
  res.clearCookie('authSessionCookie')

  // fallback
  res.cookie('authSessionCookie','',{ expiresIn: new Date(0) })
  res.status(200).json({
    message:"Signed Out User"
  })
}



module.exports = {
  authorizeUser,
  authSignOut,
  setCsrfToken,
  setAuthState
}