import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseInit"

export default async function emailSignInHandler(email:string,password:string){
   try{
      const userCredentials = signInWithEmailAndPassword(auth,email,password)
      return userCredentials;
   }

   catch(err:unknown | any){
      throw new Error(err.message)
   }
}