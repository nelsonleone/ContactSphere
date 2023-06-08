const firebaseAdmin = require('../../firebase/firebaseAdmin')

async function verifyIdToken(res,idToken){
  try{
    const decodedClaims = await firebaseAdmin.auth().verifyIdToken(idToken)

    if (!decodedClaims){
      // precaution
      res.status(400)
      throw new Error("Error Validating User")
    }

    const userRecord = await firebaseAdmin.auth().getUser(decodedClaims.uid);
    return{
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      uid: userRecord.uid
    }
  }

   catch(err){
    res.status(401)
    throw new Error("Error Authorizing User")
  }
}

module.exports = verifyIdToken;