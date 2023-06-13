import { Contact } from "../../vite-env";

export const defaultValues: Contact = {
   address: {
     country: '',
     state: '',
     city: '',
     street: '',
     postalCode: ''
    },
   birthday:  '',
   chat: '',
   companyName: '',
   department: '',
   email: '',
   firstName: '',
   inTrash: false,
   isActive: false,
   isHidden: false,
   jobTitle: '',
   lastName: '',
   labelledBy: '',
   middleName: '',
   name: '',
   nickname: '',
   phoneNumber: '',
   notes: '',
   prefix: '',
   repPhoto: '',
   relatedPeople: [
      {
         name: '',
         label: ''
      }
   ],
   suffix: '',
   website: '',
}
 