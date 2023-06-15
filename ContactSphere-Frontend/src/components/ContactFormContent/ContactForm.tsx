import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
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
import { Button } from "@mui/material"
import { RxCross1 } from 'react-icons/rx'
import { deepOrange } from '@mui/material/colors';
import { ManageLabelButton } from "../../../lib/with-tooltip"
import { useNavigate } from "react-router-dom"



function ContactForm(){

   const { register, handleSubmit, setValue, formState: {errors}, control} = useForm<Contact>({defaultValues})
   const { fields, append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.RelatedPeople })
   const [showMore,setShowMore] = useState<boolean>(false)
   const navigate = useNavigate()

   const handleOnSubmit: SubmitHandler<Contact> = (data) => {
      console.log(data)
   }

   return(
      <form onSubmit={handleSubmit(handleOnSubmit)}>
         <div className="top_section">
            <ImageUploadInput name={InputPropertyValueName.RepPhoto} register={register} setValue={setValue} />
            <ManageLabelButton className="add_label_btn" />
            <Button type="submit" className="fx-button" disabled={errors.name || errors.phoneNumber ? true : false} variant="contained"  sx={{ bgcolor: deepOrange[600] }} >
               Save
            </Button>
            <button type="button" className="fx-button" onClick={() => navigate(-1)}>
               <RxCross1 />
            </button>
         </div>

         <div className="fields_area">
            <NameInputSection error={errors.firstName?.message} showMore={showMore} register={register} />
            <FormalInputSection showMore={showMore} register={register} />
            <ContactInputSection setValue={setValue} register={register} />
            <AddressInputSection showMore={showMore} register={register} setValue={setValue}  />
            <AdditionalFields setValue={setValue} fields={fields} append={append} register={register} showMore={showMore} />
         </div>

         <button type="button"  className="show_more_btn" onClick={() => setShowMore(!showMore)}>Show {showMore ? "Less" : "More"}</button>
      </form>
   )
}

export default memo(ContactForm)
