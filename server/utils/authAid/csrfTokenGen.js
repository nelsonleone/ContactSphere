const crypto = require('crypto')

function csrfTokenGen(){
   const token = crypto.randomBytes(64).toString('hex')

   return token;
}

module.exports = csrfTokenGen;