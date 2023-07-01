import { Contact, IContactsFromDB, UserData } from "../../vite-env";
import { contactsQuerySlice } from "./contactsQuerySlice";

const CONTACTS_API_URL = '/contacts';

const extendedContactsQuerySlice = contactsQuerySlice.injectEndpoints({
   endpoints: builder => ({
      getUserData: builder.query<UserData,string>({
         query: (authUserUid) => `${CONTACTS_API_URL}/getAuthUserData?uid=${authUserUid}`,
         providesTags: ['Contact','Label']
      }),

      createContact: builder.mutation<void,{contactDetails:Contact,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/setNewContact?uid=${args.authUserUid}`,
            method: 'POST',
            body: args.contactDetails
         }),
         invalidatesTags: ['Contact']
      }),

      addLabel: builder.mutation<void,{label:string,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/addLabel?uid=${args.authUserUid}`,
            method: 'POST',
            body: { label: args.label }
         })
      }),

      // Updated Contact Labels Update
      manageLabels: builder.mutation<void,{label:string,authUserUid:string,contactId:string,actionType:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/manageLabels?uid=${args.authUserUid}&contactId=${args.contactId}&actionType=${args.actionType}`,
            method: 'POST',
            body: { label: args.label }
         })
      }),

      // Didn't Invalidate Tags For Auto Refetch Due To Large Data Fetching For Small Request
      addToFavourites: builder.mutation<IContactsFromDB,{contactID:string,authUserUid:string,status:boolean}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/interact?uid=${args.authUserUid}&contactId=${args.contactID}`,
            method: 'PUT',
            body: { status: args.status }
         })
      }),

      deleteContact: builder.mutation<void,{authUserUid:string,contactId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/deleteContact?uid=${args.authUserUid}`,
            method: 'DELETE',
            body: { contactId: args.contactId }
         }),
         invalidatesTags: ['Contact']
      }),

      // Multi Select Queries
      manageMultiContactLabels: builder.mutation<void,{authUserUid:string,label:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/manageMultipleContactsLabels?uid=${args.authUserUid}`,
            method: 'PUT',
            body: { label: args.label, selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Label']
      }),

      // Multi Contacts Delete
      deleteMultipleContacts: builder.mutation<void,{authUserUid:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/deleteMultiple?uid=${args.authUserUid}`,
            method: 'DELETE',
            body: { selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Contact']
      }),
   })
})

export const {
   useCreateContactMutation,
   useGetUserDataQuery,
   useAddLabelMutation,
   useAddToFavouritesMutation,
   useManageLabelsMutation,
   useManageMultiContactLabelsMutation
} = extendedContactsQuerySlice;