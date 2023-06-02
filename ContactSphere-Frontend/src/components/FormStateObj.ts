export const signinState = {
   email: {
      value: "",
      error: null,
   },
   password: {
      value: "",
      error: null,
   },

   // dsplayName input is not used in the signin page, 
   // won't be included in request body
   displayName: {
      value: "THIS IS A PLACEHOLDER",
      error: null,
   } 
}

export const signupState = {
   email: {
      value: "",
      error: null,
   },
   password: {
      value: "",
      error: null,
   },
   displayName: {
      value: "",
      error: null,
   } 
}