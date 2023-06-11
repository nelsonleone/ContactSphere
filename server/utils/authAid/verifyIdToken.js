const firebaseAdmin = require('../../firebase/firebaseAdmin')

async function verifyIdToken(res,idToken){
  try{
    const decodedClaims = await firebaseAdmin.auth().verifyIdToken(idToken,true)

    if (!decodedClaims){
      // precaution
      res.status(400)
      throw new Error("Error Validating User")
    }
  }

   catch(err){
    res.status(401)
    throw new Error("Error Authorizing User")
  }
}

module.exports = verifyIdToken;