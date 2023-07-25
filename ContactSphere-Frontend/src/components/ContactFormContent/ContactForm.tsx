import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { staticDefaultValue } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { memo, useEffect, useState } from "react"
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
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions"
import cleanNewContactFormFields from "../../utils/helperFns/cleanNewContactFields"
import CustomSimpleDialog from "../../../lib/popups/CustomSimpleDialog"
import { setThereAreChanges } from "../../RTK/features/shouldDiscardChangesSlice"



function ContactForm({ action, contactId, defaultValue }: { defaultValue?:Contact, action:ContactFormAction, contactId?:string }){

   const { register, handleSubmit, setValue, watch, setError, formState: {errors, isDirty}, control} = useForm<Contact>({defaultValues: defaultValue || staticDefaultValue})
   const [showMore,setShowMore] = useState(false)
   const { append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy })
   const [showLabelMenu,setShowLabelMenu] = useState(false)
   const [openAddLabelModal,setOpenAddLabelModal] = useState(false)
   const [showDiscardWarning,setShowDiscardWarning] = useState(false)
   const navigate = useNavigate()
   const labelsArray = watch('labelledBy')
   const repPhoto = watch('repPhoto')
   const phoneNumber = watch('phoneNumber')
   const relatedPeople = watch('relatedPeople')
   const [createContact, { isLoading }] = useCreateContactMutation()
   const [editContact, { isLoading:editting }] = useEditContactMutation()
   const { openNav } = useAppSelector(store => store.openNav)

   const [disabledSaveBtn,setDisableSaveBtn] = useState<boolean>(
      errors.firstName?.message || 
      errors.phoneNumber?.message ||
      isLoading || editting || !isDirty ? true : false
   )

   const uid = useAppSelector(store => store.authUser.userDetails.uid)
   const dispatch = useAppDispatch()


   const handleOnSubmit: SubmitHandler<Contact> = async(data) => {

      // Manually Set Phone Number Input Errors Due To Nature Of React-phone-input 
      if(!phoneNumber){
         setError(InputPropertyValueName.PhoneNumber,{message: "Invalid Phone Number Input"})
         setDisableSaveBtn(true)
         return;
      }

      try{
         await stopUnauthourizedActions(uid)

         // Clean Up Inputs
         const formFields = cleanNewContactFormFields(data)

         if(action === ContactFormAction.Create){
            const successRes = await createContact({
               contactDetails: formFields,
               authUserUid: uid!
            }).unwrap()

            // Internal Server Error Occured [Catch Block Can't Catch Some Of Them ]
            if(!successRes){
               throw new Error("An Error Occured Creating Contact")
            }

         }

         else{
            if(!contactId){
               throw new Error("Contact ID is invalid")
            }
            
            const successRes =  await editContact({
               contactDetails: formFields,
               authUserUid: uid!,
               contactId: contactId
            }) .unwrap()

            // Internal Server Error Occured [Catch Block Can't Catch Some Of Them ]
            if(!successRes){
               throw new Error("An Error Occured Editting Contact")
            }
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

   const handleCancelEdit = () => {
      if(!isDirty){
         navigate(-1)
         return;
      }

      setShowDiscardWarning(true)
   }

   useEffect(() => {
      // Disabled Save Button 
      errors.firstName?.message || 
      errors.birthday?.message ||
      !phoneNumber ||
      isLoading || !isDirty  ? setDisableSaveBtn(true) : setDisableSaveBtn(false)

      dispatch(setThereAreChanges(isDirty))

      return () => {
         dispatch(setThereAreChanges(false))
      }
   },[
      errors.firstName?.message,
      errors.birthday?.message,
      isLoading,
      phoneNumber,
      isDirty
   ])


   return(
      <>
         <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className={`top_section ${openNav ? 'resize_top_section' : ''}`}>
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
                  disabled={isLoading || editting ? true : false}
               />
               <Button 
                  type="submit" 
                  className="fx-button" 
                  variant="contained"  
                  disabled={disabledSaveBtn}
                  sx={{ bgcolor: '#f57e0fd0',borderRadius:action === ContactFormAction.Edit ? "30px" : "4px" }} >
                  Save
               </Button>
               
               <button type="button" disabled={isLoading || editting ? true : false} className="fx-button" onClick={handleCancelEdit}>
                  <RxCross1 />
               </button>

               <LabelMenu labelsArray={labelsArray} setOpenAddLabelModal={setOpenAddLabelModal} register={register} control={control} showLabelMenu={showLabelMenu} setShowLabelMenu={setShowLabelMenu} />
            </div>

            <div className="fields_area">
               <NameInputSection error={errors?.firstName?.message} showMore={showMore} register={register} />
               <FormalInputSection showMore={showMore} register={register} />
               <ContactInputSection error={errors?.phoneNumber?.message} phoneNumber={phoneNumber} setValue={setValue} register={register} />
               <AddressInputSection error={errors?.address?.postalCode?.message} showMore={showMore} register={register} setValue={setValue}  />
               <AdditionalFields relatedPeople={relatedPeople} error={errors?.birthday?.message} control={control} setValue={setValue} register={register} showMore={showMore} />
            </div>
            <button type="button"  className="show_more_btn" onClick={() => setShowMore(!showMore)}>Show {showMore ? "Less" : "More"}</button>
         </form>

         <AddLabelDialog mode="create" labelsArray={labelsArray} append={append} setOpen={setOpenAddLabelModal} open={openAddLabelModal} />
         {
            isLoading || editting ?
            <div className="creating_contact_loader" style={{color:"#f87407" }}>
               <LinearProgress color="inherit" />
            </div>
            :
            null
         }

         <CustomSimpleDialog
            dialogTitle="You have unsaved changes" 
            dialogText="Are you sure you want to discard your unsaved changes?" 
            open={showDiscardWarning} 
            setOpen={setShowDiscardWarning} 
            action={() => navigate(-1)}
            btnText1="Cancel"
            btnText2="Discard"
         />
      </>
   )
}

export default memo(ContactForm)
