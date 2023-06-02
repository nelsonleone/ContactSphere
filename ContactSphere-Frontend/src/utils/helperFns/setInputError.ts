import { Dispatch, SetStateAction } from "react";
import { IFormData } from "../../vite-env";

function setInputErrors(location:string, fieldsObj:IFormData, setFormData:Dispatch<SetStateAction<IFormData>>){
   const isValid = validateEmail(fieldsObj.email.value)
    
   if (fieldsObj.email.value == ""){
      setFormData((prevState) => {
         return {
            ...prevState,
            email: {
               ...prevState.email,
               error: {message:"This Field Is Required"}
            }
        }
      })
   }
   
   if (!isValid){
      setFormData((prevState) => {
         return {
            ...prevState,
            email: {
               ...prevState.email,
               error: {message:"Invalid Email"}
            }
        }
      })
   }

   if (!fieldsObj.password.value){
      setFormData((prevState) => {
         return {
            ...prevState,
            password: {
               ...prevState.password,
               error: {message:"This field is required"}
            }
        }
      })
   }


   if (location === "signup" && !fieldsObj.displayName.value){
      setFormData((prevState) => {
         return {
            ...prevState,
            displayName: {
               ...prevState.displayName,
               error: {message:"This field is required"}
            }
        }
      })
   }
}


// email format validator
function validateEmail(email:string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


export default setInputErrors;