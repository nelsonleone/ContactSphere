import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { defaultValues } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { memo, useState } from "react"
import NameInputSection from "./input_sections/NameSection"
import FormalInputSection from "./input_sections/FormalInputSection"
import ContactInputSection from "./input_sections/ContactInputSection"
import AddressInputSection from "./input_sections/AddressInputSection"
import { InputPropertyValueName } from "../../enums"
import AdditionalFields from "./input_sections/AdditionalFields"
import ImageUploadInput from '../../../lib/customInputs/ImageUploadInput'
import LabelMenu from '../../../lib/popups/LabelMenu'
import { Button } from "@mui/material"
import { RxCross1 } from 'react-icons/rx'
import { deepOrange } from '@mui/material/colors';
import { ManageLabelButton } from "../../../lib/with-tooltip"
import { useNavigate } from "react-router-dom"



function ContactForm(){

   const { register, handleSubmit, setValue, formState: {errors}, control} = useForm<Contact>({defaultValues})
   const { fields:labelsArray } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy })
   const [showMore,setShowMore] = useState<boolean>(false)
   const [showLabelMenu,setShowLabelMenu] = useState<boolean>(false)
   const navigate = useNavigate()

   const handleOnSubmit: SubmitHandler<Contact> = (data) => {
      console.log(data)
   }

   return(
      <>
         <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="top_section">
               <ImageUploadInput name={InputPropertyValueName.RepPhoto} register={register} setValue={setValue} />
               <div className="added_labels_container">
                  {
                     labelsArray?.length &&
                     labelsArray.map(label => (
                        
                     ))
                  }
               </div>
               <ManageLabelButton className="add_label_btn" handleClick={() => setShowLabelMenu(!showLabelMenu)} />
               <Button 
                  type="submit" 
                  className="fx-button" 
                  disabled={errors.firstName?.message || errors.phoneNumber?.message  ? true : false} 
                  variant="contained"  
                  sx={{ bgcolor: deepOrange[400] }} >
                  Save
               </Button>
               <button type="button" className="fx-button" onClick={() => navigate(-1)}>
                  <RxCross1 />
               </button>

               <LabelMenu register={register} control={control} showLabelMenu={showLabelMenu} setShowLabelMenu={setShowLabelMenu} />
            </div>

            <div className="fields_area">
               <NameInputSection error={errors.firstName?.message} showMore={showMore} register={register} />
               <FormalInputSection showMore={showMore} register={register} />
               <ContactInputSection setValue={setValue} register={register} />
               <AddressInputSection showMore={showMore} register={register} setValue={setValue}  />
               <AdditionalFields control={control} setValue={setValue} register={register} showMore={showMore} />
            </div>

            <button type="button"  className="show_more_btn" onClick={() => setShowMore(!showMore)}>Show {showMore ? "Less" : "More"}</button>
         </form>
      </>
   )
}

export default memo(ContactForm)
