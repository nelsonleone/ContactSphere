import { staticDefaultValue } from "../../components/ContactFormContent/newContactDefaultValues";
import { Contact, IContactsFromDB } from "../../vite-env";

export default function setEditFormDefaultValues(contactDetails:IContactsFromDB|undefined): Contact{

   if(!contactDetails){
      return staticDefaultValue;
   }

   return{
      address: {
         country: contactDetails.address.country,
         state: contactDetails.address.state,
         city: contactDetails.address.city,
         street: contactDetails.address.street,
         postalCode: contactDetails.address.postalCode
      },
      birthday:  new Date(contactDetails.birthday).toLocaleDateString('en-US'),
      companyName: contactDetails.companyName,
      department: contactDetails.department,
      email: contactDetails.email,
      firstName: contactDetails.firstName,
      jobTitle: contactDetails.jobTitle,
      lastName: contactDetails.lastName,
      labelledBy: contactDetails.labelledBy,
      middleName: contactDetails.middleName,
      nickname: contactDetails.nickname,
      phoneNumber: contactDetails.phoneNumber,
      prefix: contactDetails.prefix,
      repPhoto: contactDetails.repPhoto,
      relatedPeople:  contactDetails.relatedPeople,
      social: {
         site: contactDetails.social.site,
         handle: contactDetails.social.handle
      },
      suffix: contactDetails.suffix,
      website: contactDetails.website,    
   }
}