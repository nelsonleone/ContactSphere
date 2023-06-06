import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseInit";

export default async function emailSignupHandler(email:string,password:string){
   try{
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
      return userCredentials;
   }

   catch(error:unknown|any){
      throw new Error(error.message)
   }
}