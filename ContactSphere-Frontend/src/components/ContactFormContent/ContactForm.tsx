import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { staticDefaultValue } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { memo, useEffect, useState, useCallback } from "react"
import NameInputSection from "./input_sections/NameSection"
import FormalInputSection from "./input_sections/FormalInputSection"
import ContactInputSection from "./input_sections/ContactInputSection"
import AddressInputSection from "./input_sections/AddressInputSection"
import { AlertSeverity, ContactFormAction, InputPropertyValueName } from "../../enums"
import AdditionalFields from "./input_sections/AdditionalFields"
import ImageUploadInput from '../../../lib/customInputs/ImageUploadInput'
import LabelMenu from '../../../lib/popups/LabelMenu'
import { Button, LinearProgress } from "@mui/material"
import { RxCross1 } from 'react-icons/rx'
import { ManageLabelButton } from "../../../lib/with-tooltip"
import AddLabelDialog from "../../../lib/popups/AddLabelDialog"
import { useNavigate } from "react-router-dom"
import AddedLabels from "./input_sections/AddedLabels"
import { useCreateContactMutation, useEditContactMutation } from '../../RTK/features/injectedContactsApiQueries'
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxCustomHooks"
import { setShowAlert } from "../../RTK/features/alertSlice"
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice"
import hasObjectChanged from "../../utils/helperFns/compareObjFieldsChange"



function ContactForm({ action, contactId, defaultValue }: { defaultValue?:Contact, action:ContactFormAction, contactId?:string }){

   const { register, handleSubmit, setValue, watch, formState: {errors}, control} = useForm<Contact>({defaultValues: defaultValue || staticDefaultValue})
   const [showMore,setShowMore] = useState(false)
   const { append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy })
   const [showLabelMenu,setShowLabelMenu] = useState(false)
   const [openAddLabelModal,setOpenAddLabelModal] = useState(false)
   const navigate = useNavigate()
   const labelsArray = watch('labelledBy')
   const repPhoto = watch('repPhoto')
   const phoneNumber = watch('phoneNumber')
   const [createContact, { isLoading }] = useCreateContactMutation()
   const [editContact, { isLoading:editting }] = useEditContactMutation()
   const [disabledSaveBtn,setDisableSaveBtn] = useState<boolean>(
      errors.firstName?.message || 
      errors.phoneNumber?.message ||
      isLoading  ? true : false
   )
   const uid = useAppSelector(store => store.authUser.userDetails.uid)
   const dispatch = useAppDispatch()
   const formValues = useCallback(() => watch(), [watch])


   const handleOnSubmit: SubmitHandler<Contact> = async(data) => {
      try{
         if(!uid){
            // precaution
            throw new Error("Unauthourized Request, Please Login")
         }

         // Clean Up Inputs
         const formFields = {...data,
            address: {
               ...data.address
            },
            birthday: data.birthday ? new Date(data.birthday) : '',
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            MiddleName: data.middleName.trim(),
            Nickname: data.nickname.trim(),
         }

         if(action === ContactFormAction.Create){
            await createContact({
               contactDetails: formFields,
               authUserUid: uid
            })
         }
         else{
            await editContact({
               contactDetails: formFields,
               authUserUid: uid,
               contactId: contactId || ''
            }) 
         }

         dispatch(setShowSnackbar({
            snackbarMessage: `Contact ${action === ContactFormAction.Create ? "Created" : "Editted"}`,
         }))

         navigate("/")
      }

      catch(err:any|unknown){
         dispatch(setShowAlert({
            alertMessage: err?.message || `Error Occured ${ContactFormAction.Create ? "Creating" : "Editting"} Contact`,
            severity: AlertSeverity.ERROR
         }))
      }
   }

   useEffect(() => {
      // Disabled Save Button 
      errors.firstName?.message || 
      errors.phoneNumber?.message ||
      isLoading  ? setDisableSaveBtn(true) : setDisableSaveBtn(false)
   },[errors.firstName?.message,errors.phoneNumber?.message,errors.birthday?.message,isLoading])


   // Dsiable Save Button In Edit Mode If Fields Remains The Same
   useEffect(() => {
      if(action === ContactFormAction.Edit) {
         setDisableSaveBtn(hasObjectChanged(formValues,defaultValue))
      }
   },[formValues])

   return(
      <>
         <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="top_section">
               <ImageUploadInput repPhoto={repPhoto} name={InputPropertyValueName.RepPhoto} register={register} setValue={setValue} />
               {
                  labelsArray?.length ?
                  <AddedLabels setValue={setValue} labelsArray={labelsArray} control={control} />
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
                  sx={{ bgcolor: '#f57e0fd0',borderRadius:action === ContactFormAction.Edit ? "30px" : "4px" }} >
                  Save
               </Button>
               <button type="button" className="fx-button" onClick={() => navigate(-1)}>
                  <RxCross1 />
               </button>

               <LabelMenu labelsArray={labelsArray} setOpenAddLabelModal={setOpenAddLabelModal} register={register} control={control} showLabelMenu={showLabelMenu} setShowLabelMenu={setShowLabelMenu} />
            </div>

            <div className="fields_area">
               <NameInputSection error={errors?.firstName?.message} showMore={showMore} register={register} />
               <FormalInputSection showMore={showMore} register={register} />
               <ContactInputSection phoneNumber={phoneNumber} setValue={setValue} register={register} />
               <AddressInputSection error={errors?.address?.postalCode?.message} showMore={showMore} register={register} setValue={setValue}  />
               <AdditionalFields error={errors?.birthday?.message} control={control} setValue={setValue} register={register} showMore={showMore} />
            </div>

            <button type="button"  className="show_more_btn" onClick={() => setShowMore(!showMore)}>Show {showMore ? "Less" : "More"}</button>
         </form>

         <AddLabelDialog labelsArray={labelsArray} append={append} setOpen={setOpenAddLabelModal} open={openAddLabelModal} />
         {
            isLoading || editting ?
            <div className="creating_contact_loader" style={{color:"#f87407" }}>
               <LinearProgress color="inherit" />
            </div>
            :
            null
         }
      </>
   )
}

export default memo(ContactForm)
