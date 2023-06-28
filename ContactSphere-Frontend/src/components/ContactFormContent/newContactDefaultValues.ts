import { Contact } from "../../vite-env";

export const defaultValues: Contact = {
   address: {
     country: 'United States',
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
   jobTitle: '',
   lastName: '',
   labelledBy: [],
   middleName: '',
   nickname: '',
   phoneNumber: '',
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
 