const checkForUid = async(response,uid) => {
   if(!uid){
      response.status(400)
      throw new Error("UID QUERY IS INVALID")
   }
}

const checkIfUserExists = async(response,authUserData) => {
   if(!authUserData){
      response.status(400)
      throw new Error("NO USER WITH SPECIFIED UID WAS FOUND")
   }
}

const checkForContactId = async(response,contactId) => {
   if(!contactId){
      response.status(400)
      throw new Error("INVALID PARAMTERS PASSED 'contactId query was not provided' ")
   }
}

module.exports = {
   checkForUid,
   checkIfUserExists,
   checkForContactId
}