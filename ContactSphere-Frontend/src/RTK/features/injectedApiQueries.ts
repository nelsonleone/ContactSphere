import { AuthUserDetails } from "../../vite-env";
import { authQuerySlice } from "./authQuerySlice";


const extendedAuthQueries = authQuerySlice.injectEndpoints({
   endpoints: builder => ({
      setNewUser: (builder.mutation<AuthUserDetails, UserCredentails)
   })
})