import { memo, useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";
import { FieldArrayWithId, UseFormRegister, UseFieldArrayAppend , UseFormSetValue} from "react-hook-form";
import { Contact } from "../../../vite-env";
import { InputPropertyValueName } from "../../../enums";
import { HiPlusCircle } from "react-icons/hi";
import { FaBirthdayCake } from 'react-icons/fa'
import { CgWebsite } from "react-icons/cg";
import { BsChatRightText } from "react-icons/bs";
import { TbCirclesRelation } from 'react-icons/tb'

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   setValue: UseFormSetValue<Contact>,
   fields: FieldArrayWithId<Contact, InputPropertyValueName.RelatedPeople , "id">[],
   append: UseFieldArrayAppend<Contact, 'relatedPeople'>
}


function AdditionalFields(props:IProps){

   const { register, showMore , fields, append, setValue} = props;
   const id = useId()

   return(
      <div className="additional_fields">
         <div className={'dx_container birthday_field_container'}>
            {
               showMore &&
               <FaBirthdayCake />
            }
            <NewContactFormInput
               label='Birthday'
               register={register}
               name={InputPropertyValueName.Birthday}
               id={`${id}-birthday`}
               type='text'
               show={showMore}
               helperText="dd/mm/yyyy"
            />
         </div>

         <div className="dx_container website_field_container">
            {
               showMore &&
               <CgWebsite />
            }
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
            showMore && fields.map((field,index) => (
               <div key={field.id} className="dx_container related_people_field_inputs">
                  <TbCirclesRelation />
                  <NewContactFormInput 
                     label='Related People'
                     register={register}
                     name={`${InputPropertyValueName.RelatedPeople}[${index}].name`}
                     id={`${id}-relatedpeople-${index}-name`}
                     type='text'
                     show={showMore}
                  />
                  <CustomLabelSelect 
                     labelFor="related_people_label"
                     register={register} 
                     setValue={setValue}
                     index={index}
                     name={`${InputPropertyValueName.RelatedPeople}[${index}].label`}
                     label="Label"
                     show={showMore}
                  />
                  <button type="button" className={`field_append_btn append_btn_${index}`} onClick={() => append({ name: '', label: '' })}>
                    <HiPlusCircle />
                  </button>
               </div>
            ))
         }


         <div className="dx_container chat_field_container">
            {
               showMore &&
               <BsChatRightText />
            }
            <NewContactFormInput
               label='Chat'
               register={register}
               name={InputPropertyValueName.Chat}
               id={`${id}-website`}
               type='text'
               show={showMore}
            />
         </div>
      </div>
   )
}

export default memo(AdditionalFields)