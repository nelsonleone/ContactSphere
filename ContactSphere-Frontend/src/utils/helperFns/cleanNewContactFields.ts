import { Contact } from "../../vite-env";
import capitalizeString from "./cleanContactFields";

export default function cleanNewContactFormFields(fields:Contact):Contact{
   const cleanedFormFields = {
      ...fields,
      birthday: fields.birthday ? new Date(fields.birthday) : '',
      firstName: capitalizeString(fields.firstName),
      lastName: capitalizeString(fields.lastName),
      middleName: capitalizeString(fields.middleName),
      nickname: capitalizeString(fields.nickname),
      relatedPeople: fields.relatedPeople.filter(val => val.name !== '' && val.name !== undefined)
   }

   return cleanedFormFields;
}