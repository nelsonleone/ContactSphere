import { useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { InputPropertyValueName } from "../../../enums";
import { HiPlusCircle } from "react-icons/hi";
import { FaBirthdayCake } from 'react-icons/fa'

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   fields: FieldArrayWithId<Contact, "relatedPeople", "id">[]
}


export default function AdditionalFields(props:IProps){

   const { register, showMore , fields} = props;
   const id = useId()

   return(
      <div className="additional_fields">
         <div className="dx_container birthday_field_container">
            <FaBirthdayCake />
            <NewContactFormInput
               label='Birthday'
               register={register}
               name={InputPropertyValueName.Birthday}
               id={`${id}-birthday`}
               type='text'
               show={showMore}
            />
            <p>dd/mm/yyyy</p>
         </div>

         <div className="dx_container website_field_container">
            <
            <NewContactFormInput
               label='Website'
               register={register}
               name={InputPropertyValueName.Website}
               id={`${id}-website`}
               type='text'
               show={showMore}
            />
         </div>

         {
            fields.map((field,index) => (
               <div key={field.id} className="dx_container related_people_field_inputs">
                  <NewContactFormInput 
                     label='Related People'
                     register={register}
                     name={`InputPropertyValueName.RelatedPeople[${index}].name`}
                     id={`${id}-relatedpeople-${index}-name`}
                     type='text'
                     show={showMore}
                  />
                  <CustomLabelSelect 
                     register={register} 
                     name={`InputPropertyValueName.RelatedPeople[${index}].label`}
                     label="Label"
                  />
                  <HiPlusCircle />
               </div>
            ))
         }
      </div>
   )
}