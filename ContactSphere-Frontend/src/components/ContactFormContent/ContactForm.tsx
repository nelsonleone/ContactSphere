import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { defaultValues } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { memo, useEffect, useState } from "react"
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
import { ManageLabelButton } from "../../../lib/with-tooltip"
import AddLabelDialog from "../../../lib/popups/AddLabelDialog"
import { useNavigate } from "react-router-dom"
import AddedLabels from "./input_sections/AddedLabels"



function ContactForm(){

   const { register, handleSubmit, setValue, watch, formState: {errors}, control} = useForm<Contact>({defaultValues})
   const [showMore,setShowMore] = useState(false)
   const [showLabelMenu,setShowLabelMenu] = useState(false)
   const [openAddLabelModal,setOpenAddLabelModal] = useState(false)
   const [disabledSaveBtn,setDisableSaveBtn] = useState<boolean>(errors.firstName?.message || errors.phoneNumber?.message ? true : false)
   const navigate = useNavigate()
   const labelsArray = watch('labelledBy')

   const handleOnSubmit: SubmitHandler<Contact> = (data) => {
      console.log(data)
   }

   useEffect(() => {
      errors.firstName?.message || errors.phoneNumber?.message ? setDisableSaveBtn(true) : setDisableSaveBtn(false)
   },[errors.firstName?.message,errors.phoneNumber?.message])

   return(
      <>
         <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="top_section">
               <ImageUploadInput name={InputPropertyValueName.RepPhoto} register={register} setValue={setValue} />
               {
                  labelsArray?.length ?
                  <AddedLabels labelsArray={labelsArray} control={control} />
                  :
                  null
               }
               <ManageLabelButton 
                  penMode={labelsArray?.length ? true : false} 
                  className={!labelsArray?.length ? "add_label_btn" : "add_label_btn penMode"}
                  handleClick={() => setShowLabelMenu(!showLabelMenu)} 
               />
               <Button 
                  type="submit" 
                  className="fx-button" 
                  variant="contained"  
                  disabled={disabledSaveBtn}
                  sx={{ bgcolor: '#f57e0fd0' }} >
                  Save
               </Button>
               <button type="button" className="fx-button" onClick={() => navigate(-1)}>
                  <RxCross1 />
               </button>

               <LabelMenu setOpenAddLabelModal={setOpenAddLabelModal} register={register} control={control} showLabelMenu={showLabelMenu} setShowLabelMenu={setShowLabelMenu} />
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

         <AddLabelDialog control={control} setOpen={setOpenAddLabelModal} open={openAddLabelModal} />
      </>
   )
}

export default memo(ContactForm)
