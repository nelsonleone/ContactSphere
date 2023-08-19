import { Contact } from "../../vite-env";

export const staticDefaultValue: Contact = {
   address: {
     country: 'United States',
     state: '',
     city: '',
     street: '',
     postalCode: ''
    },
   birthday:  '',
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
   social: {
      site:'',
      handle: ''
   },
   suffix: '',
   website: '',
}
 