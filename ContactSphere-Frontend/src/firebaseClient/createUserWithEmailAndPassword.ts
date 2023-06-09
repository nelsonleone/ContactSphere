import { createUserWithEmailAndPassword , setPersistence, browserSessionPersistence} from "firebase/auth";
import { auth } from "./firebaseInit";
import customFirebaseError from "../utils/helperFns/customFirebaseError";

export default async function emailSignupHandler(email:string,password:string){

   setPersistence(auth, browserSessionPersistence)

   try{
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
      return userCredentials;
   }

   catch(error:unknown|any){
      throw new Error(customFirebaseError(error.code))
   }
}