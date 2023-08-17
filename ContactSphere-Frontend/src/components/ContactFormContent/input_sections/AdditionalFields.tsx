import { useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";
import { Control, useFieldArray } from "react-hook-form"
import { Contact } from "../../../vite-env";
import { InputPropertyValueName } from "../../../enums";
import { HiPlusCircle } from "react-icons/hi";
import { FaBirthdayCake } from 'react-icons/fa'
import { CgWebsite } from "react-icons/cg";
import { BsChatRightText } from "react-icons/bs";
import { TbCirclesRelation } from 'react-icons/tb'

interface IProps {
   showMore: boolean,
   control:  Control<Contact, any>,
   social: Contact['social'],
   error: string | undefined,
   relatedPeople: {
      label: string,
      name: string
   }[]
}


function AdditionalFields(props:IProps){

   const { showMore, control, error, relatedPeople, social } = props;
   const { fields, append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.RelatedPeople })
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
               control={control}
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
               control={control}
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
                     control={control}
                     name={`${InputPropertyValueName.RelatedPeople}[${index}].name`}
                     id={`${id}-relatedpeople-${index}-name`}
                     type='text'
                     show={showMore}
                  />

                  <CustomLabelSelect 
                     control={control}
                     label="Label"
                     name={`${InputPropertyValueName.RelatedPeople}[${index}].label`}
                     show={showMore}
                     selectFor="relatedPeople"
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
            <CustomLabelSelect 
               control={control}
               name={InputPropertyValueName.SocialSite}
               label="Social Site"
               selectFor="social"
               show={showMore}
               value={social.site}
            />
            <NewContactFormInput
               label='Handle'
               control={control}
               name={InputPropertyValueName.SocialHandle}
               id={`${id}-social-handle`}
               type='text'
               show={showMore}
               haveSelectedSite={social.site ? true : false}
               inputFor="socialHandle"
            />
         </div>
      </div>
   )
}

export default AdditionalFields;