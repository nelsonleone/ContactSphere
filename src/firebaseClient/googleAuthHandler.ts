import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseInit";

export default async function googleAuthHandler(){
   const provider = new GoogleAuthProvider()

   try{
      const userCredentials = await signInWithPopup(auth,provider)

      const {
         email,
         uid,
         photoURL,
         displayName
      } = userCredentials.user;

      return {
         email,
         uid,
         photoURL,
         displayName
      }
   }

   catch(err:unknown|any){
      throw new Error(err?.code || "Error Authenticating User, Try Again")
   }
}