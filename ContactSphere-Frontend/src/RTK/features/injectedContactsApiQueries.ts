import { Contact } from "../../vite-env";
import { contactsQuerySlice } from "./contactsQuerySlice";

const CONTACTS_API_URL = '/server/contacts';

const extendedContactsQuerySlice = contactsQuerySlice.injectEndpoints({
   endpoints: builder => ({
      getContacts: builder.query<void,string>({
         query: (authUserUid) => `${CONTACTS_API_URL}/getAuthUserContacts?uid=${authUserUid}`
      }),

      createContact: builder.mutation<void,{contactDetails:Contact,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/getAuthUserContacts?uid=${args.authUserUid}`,
            method: 'POST',
            body: args.contactDetails
         })
      }),
   })
})

export const {
   useCreateContactMutation,
   useGetContactsQuery
} = extendedContactsQuerySlice;