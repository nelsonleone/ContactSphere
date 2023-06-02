import { useSetNewUserMutation, useSignInUserMutation } from "../RTK/features/injectedApiQueries";
import { AuthFormLocation } from "../enums";

export default function useAuthentication(location:string){
   const setNewUserMutation = useSetNewUserMutation()
   const signInUserMutation = useSignInUserMutation()

   const mutationRequestResult = location === AuthFormLocation.SIGN_IN  ? signInUserMutation : setNewUserMutation;
   const [authRequest, { isLoading, isError, error } ] = mutationRequestResult;

   return { authRequest, isLoading, isError, error }
}