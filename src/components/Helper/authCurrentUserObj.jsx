export default function authCurrentUserObj(currentUser){
   return {
      email:currentUser.email,
      displayName:currentUser.displayName,
      photoURL: currentUser.photoURL,
      userID: currentUser.uid
   }
}