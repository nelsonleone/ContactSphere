const asyncHandler = require('express-async-handler')
const cleanDisplayName = require('../utils/cleanDisplayName')
const firebaseAdmin = require('../firebase/firebaseAdmin')
const verifyIdToken = require('../utils/authAid/verifyIdToken')
const checkCsrfToken = require('../utils/authAid/checkCsrfToken')

// Handled User authorization Request
const authorizeUser = asyncHandler(async (req,res) => {
  const idToken = res.body.idToken.toString()
  
  await checkCsrfToken(req,res)
  const { uid } = await verifyIdToken(idToken)

  try {
    const expiresIn = 60 * 60 * 24 * 3 * 1000;
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn })
    const options = { 
      maxAge: expiresIn, 
      httpOnly: true, 
      secure: true, 
      domain: process.env.NODE_ENV === "production" ? process.env.FRONTEND_APP_URL : 'localhost:5173',
      url: '/',
      sameSite: 'strict'
    }
    res.cookie('authSessionCookie', sessionCookie, options)
    res.status(200).end(JSON.stringify({
      message:  "SUCCESS"
    }))
  } 
  
  catch (error) {
    res.status(401).send('UNAUTHORIZED REQUEST!')
  }
})




// Handled Signout Request
const authSignOut = (req,res) => {
  res.clearCookie('authSessionCookie')

  // fallback
  res.cookie('authToken','',{ expiresIn: new Date(0) })
  res.status(200).send("Signed Out User")
}



const handleGoogleSignin = (req,res) => {
  
}


module.exports = {
  authorizeUser,
  authSignOut
}