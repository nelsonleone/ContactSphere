const jwt = require('jsonwebtoken')

function generateAuthToken(res,userId){
   const authToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY,{ expiresIn: '3d'})


   res.cookie('authToken', authToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true
   })   
}

module.exports = generateAuthToken;