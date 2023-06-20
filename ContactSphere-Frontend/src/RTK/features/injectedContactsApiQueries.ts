import { Contact } from "../../vite-env";
import { contactsQuerySlice } from "./contactsQuerySlice";

const CONTACTS_API_URL = '/contacts';

const extendedContactsQuerySlice = contactsQuerySlice.injectEndpoints({
   endpoints: builder => ({
      getUserData: builder.query<void,string>({
         query: (authUserUid) => `${CONTACTS_API_URL}/getAuthUserData?uid=${authUserUid}`
      }),

      createContact: builder.mutation<void,{contactDetails:Contact,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/setNewContact?uid=${args.authUserUid}`,
            method: 'POST',
            body: args.contactDetails
         })
      }),

      addLabel: builder.mutation<void,{label:string,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/addLabel?uid=${args.authUserUid}`,
            method: 'POST',
            body: { label: args.label }
         })
      }),
   })
})

export const {
   useCreateContactMutation,
   useGetUserDataQuery,
   useAddLabelMutation
} = extendedContactsQuerySlice;