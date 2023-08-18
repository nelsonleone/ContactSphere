import { Contact, IContactsFromDB, UserData, UserLabels, IServerResponseObj, Duplicate } from "../../../vite-env";
import { contactsQuerySlice } from "./contactsQuerySlice";

const CONTACTS_API_URL = '/contacts';

const extendedContactsQuerySlice = contactsQuerySlice.injectEndpoints({
   endpoints: builder => ({
      getUserData: builder.query<UserData,string>({
         query: (authUserUid) => `${CONTACTS_API_URL}/getAuthUserData?uid=${authUserUid}`,
         providesTags: ['Contact','Label']
      }),

      createContact: builder.mutation<IServerResponseObj,{contactDetails:Contact,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/setNewContact?uid=${args.authUserUid}`,
            method: 'POST',
            body: args.contactDetails
         }),
         invalidatesTags: ['Contact']
      }),


      editContact: builder.mutation<IServerResponseObj,{contactDetails:Contact,authUserUid:string,contactId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/setEdittedContact?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'PUT',
            body: args.contactDetails
         }),
         invalidatesTags: ['Contact']
      }),


      addLabel: builder.mutation<UserLabels,{label:string,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/addLabel?uid=${args.authUserUid}`,
            method: 'POST',
            body: { label: args.label }
         })
      }),


      removeUserLabel: builder.mutation<UserLabels,{label:string,authUserUid:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/removeLabel?uid=${args.authUserUid}`,
            method: 'DELETE',
            body: { label: args.label }
         })
      }),


      editUserLabel: builder.mutation<void,{oldLabel:string,label:string,authUserUid:string,labelId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/editUserLabel?uid=${args.authUserUid}`,
            method: 'PUT',
            body: {
               labelForEditObj: { label: args.label, _id: args.labelId },
               oldLabel: args.oldLabel
            }
         }),
         invalidatesTags: ['Label']
      }),

      // Updated Contact Labels Update
      manageLabels: builder.mutation<IContactsFromDB,{label:string,authUserUid:string,contactId:string,actionType:"add"|"remove"}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/manageUserContactLabels?uid=${args.authUserUid}&contactId=${args.contactId}&actionType=${args.actionType}`,
            method: 'POST',
            body: { label: args.label }
         })
      }),

      // Didn't Invalidate Tags For Auto Refetch Due To Large Data Fetching For Small Request
      addToFavourites: builder.mutation<IContactsFromDB,{contactId:string,authUserUid:string,status:boolean}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/interact?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'PUT',
            body: { status: args.status }
         })
      }),

      deleteContact: builder.mutation<IServerResponseObj,{authUserUid:string,contactId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/deleteContact?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Contact']
      }),

      trashContact: builder.mutation<IServerResponseObj,{authUserUid:string,contactId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/sendToTrash?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Contact']
      }),


      restoreFromTrash: builder.mutation<IServerResponseObj,{authUserUid:string,contactId:string}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/restoreFromTrash?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'PUT',
         }),
         invalidatesTags: ['Contact']
      }),


      hideContact: builder.mutation<IServerResponseObj,{authUserUid:string,contactId:string,status:boolean}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/hideContact?uid=${args.authUserUid}&contactId=${args.contactId}`,
            method: 'PUT',
            body: { status:args.status }
         }),
         invalidatesTags: ['Contact']
      }),

      // Multi Select Queries
      manageMultiContactLabels: builder.mutation<IServerResponseObj,{authUserUid:string,label:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/manageMultipleContactsLabels?uid=${args.authUserUid}`,
            method: 'POST',
            body: { label: args.label, selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Label']
      }),

      // Trash Multiple Contacts
      sendMultipleToTrash: builder.mutation<IServerResponseObj,{authUserUid:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/sendMultipleToTrash?uid=${args.authUserUid}`,
            method: 'DELETE',
            body: { selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Contact']
      }),

      // Multi Contacts Delete
      deleteMultipleContacts: builder.mutation<IServerResponseObj,{authUserUid:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/deleteMultiple?uid=${args.authUserUid}`,
            method: 'DELETE',
            body: { selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Contact']
      }),


      // Multi Contacts Restore From Trash
      restoreMultipleFromTrash: builder.mutation<IServerResponseObj,{authUserUid:string,selectedContacts:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/restoreMultipleFromTrash?uid=${args.authUserUid}`,
            method: 'PUT',
            body: { selectedContacts: args.selectedContacts }
         }),
         invalidatesTags: ['Contact']
      }),


      // Multi Contacts Hide
      hideMultipleContacts: builder.mutation<IServerResponseObj,{authUserUid:string,selectedContacts:string[],status:boolean}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/hideMultipleContacts?uid=${args.authUserUid}`,
            method: 'PUT',
            body: { selectedContacts: args.selectedContacts, status:args.status }
         }),
         invalidatesTags: ['Contact']
      }),



      // Merge and fix contacts
      mergeDuplicateContacts: builder.mutation<IServerResponseObj,{authUserUid:string,duplicatesIds:string[]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/mergeDuplicates?uid=${args.authUserUid}`,
            method: 'PUT',
            body: { duplicatesIds: args.duplicatesIds }
         }),
         invalidatesTags: ['Contact']
      }),

      // Merge and fix contacts
      mergeAllDuplicateContacts: builder.mutation<IServerResponseObj,{authUserUid:string,allDuplicates:Duplicate[][]}>({
         query: (args) => ({
            url: `${CONTACTS_API_URL}/mergeAllDuplicates?uid=${args.authUserUid}`,
            method: 'PUT',
            body: { allDuplicates: args.allDuplicates  }
         }),
         invalidatesTags: ['Contact']
      })
   })
})

export const {
   useCreateContactMutation,
   useEditContactMutation,
   useGetUserDataQuery,
   useAddLabelMutation,
   useAddToFavouritesMutation,
   useManageLabelsMutation,
   useManageMultiContactLabelsMutation,
   useDeleteContactMutation,
   useDeleteMultipleContactsMutation,
   useHideContactMutation,
   useHideMultipleContactsMutation,
   useRestoreFromTrashMutation,
   useRestoreMultipleFromTrashMutation,
   useRemoveUserLabelMutation,
   useEditUserLabelMutation,
   useSendMultipleToTrashMutation,
   useTrashContactMutation,
   useMergeDuplicateContactsMutation,
   useMergeAllDuplicateContactsMutation
} = extendedContactsQuerySlice;