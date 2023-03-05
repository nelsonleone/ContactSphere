export  function authInputErrorChecker(errorCode){
 console.log(errorCode)
   switch (errorCode) {
      case "auth/user-not-found":
         return "User Not Found"
      break;
      case "auth/invalid-password":
         return "Input a Valid Password"
      break;
      case "auth/invalid-email":
         return "Invalid Email"
      break;
      case "auth/email-already-in-use":
         return  "Email Already In Use"
      break;
      case "auth/wrong-password":
         return "Wrong Password"
      break;
      case "auth/too-many-requests":
         return "Too Many Request, Try Again Later"
      break;
      default:
         return "Enter A Valid Email And Password"
      break;
   }
}

export function authProviderSignInError(errorCode){
   switch (errorCode) {
      case "auth/user-not-found":
         return "User Not Found"
      break;
      case "auth/invalid-password":
         return "Input a Valid Password"
      break;
      case "auth/invalid-email":
         return "Invalid Email"
      break;
      case "auth/internal-error":
         return  "Internal Error "
      break;
      case "auth/wrong-password":
         return "Wrong Password"
      break;
      case "auth/too-many-requests":
         return "Too Many Request"
      break;
      case "auth/user-disabled":
         return "User Is Disabled"
      break;
      case "auth/network-request-failed":
         return "Network Error"
      break;
      case "auth/popup-closed-by-user":
         return "Popup Closed By User"
      break;
      default:
         return "Error authenticating user"
      break;
   }
}