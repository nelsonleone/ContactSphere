import { useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";
import { UseFormRegister, useFieldArray } from "react-hook-form"
import {  Control , UseFormSetValue } from "react-hook-form";
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
   control:  Control<Contact, any>,
   error: string | undefined,
   relatedPeople: {
      label: string,
      name: string
   }[]
}


function AdditionalFields(props:IProps){

   const { register, showMore, setValue, control, error, relatedPeople } = props;
   const { fields, append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.RelatedPeople })
   const id = useId()

   console.log(relatedPeople)

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
               error={error}
               helperText="Use Format - MM/DD/YYYY"
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
                  <TbCirclesRelation className={`related_people_icon related_people_icon_${index}`} />
                  <NewContactFormInput 
                     label='Related People'
                     register={register}
                     name={`${InputPropertyValueName.RelatedPeople}[${index}].name`}
                     id={`${id}-relatedpeople-${index}-name`}
                     type='text'
                     show={showMore}
                  />

                  <CustomLabelSelect 
                     setValue={setValue}
                     index={index}
                     label="Label"
                     show={showMore}
                     value={relatedPeople[index].label}
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

export default AdditionalFields;