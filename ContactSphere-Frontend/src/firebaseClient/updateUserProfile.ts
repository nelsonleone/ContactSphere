import { updateProfile } from "firebase/auth";
import { auth } from "./firebaseInit";

export default async function updateUserProfile(displayName:string){
   try{
      if (auth.currentUser){
         await updateProfile(auth.currentUser,{ displayName })
      }

      else{
         // precaution
         throw new Error("User Authentication Failed")
      }
   }

   catch(err:unknown|any){
      console.log(err.code)
   }
}