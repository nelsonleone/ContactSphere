function checkCsrfToken(req,res){
   const csrfToken = req.body.csrfToken.toString()
   if(csrfToken !== req.cookies.csrfToken){
      res.status(401)
      throw new Error("UNAUTHOURIZED REQUEST")
      return;
   }
}

module.exports = checkCsrfToken;