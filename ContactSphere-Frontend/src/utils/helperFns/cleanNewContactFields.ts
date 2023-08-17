import { Contact } from "../../vite-env";
import capitalizeString from "./capitalizeString";

export default function cleanNewContactFormFields(fields:Contact):Contact{
   const cleanedFormFields = {
      ...fields,
      birthday: fields.birthday ? new Date(fields.birthday) : '',
      firstName: capitalizeString(fields.firstName),
      lastName: capitalizeString(fields.lastName),
      middleName: capitalizeString(fields.middleName),
      relatedPeople: fields.relatedPeople.filter(val => val.name !== '' && val.name !== undefined),
      social: fields.social.site && fields.social.handle ? fields.social : { site:"", handle:"" }
   }

   return cleanedFormFields;
}