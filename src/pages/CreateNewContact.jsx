import { RxCross1 } from "react-icons/rx"
import { useId , useState, useEffect } from "react"
import { FcAddImage } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { setLoading } from "../redux/features/loadingSlice"
import CreateContactForm from "../components/CreateContactForm"
import { useDispatch, useSelector } from "react-redux"
import { setNewContact } from "../redux/features/asyncThunks"
import { Alert, Snackbar } from "@mui/material"
import Loading from "../components/Loading"
import handleImageFileUpload from "../components/Helper/handleImageFileUpload"



export default function CreateNewContact(){

   const id = useId()
   const [showMore,setShowMore] = useState(false)
   const { userID }  = useSelector(store => store.userAuth.authUserDetails)
   const { error } = useSelector(store => store.contact.contactsData)
   const [disableSave,setDisableSave] = useState(true)
   const [openSnackbar,setOpenSnackbar] = useState(false)
   const navigate = useNavigate()
   const { isLoading } = useSelector(store => store.loading)
   const dispatch = useDispatch()
   const [contactDetails,setContactDetails] = useState({
      birthday:"",
      cityName:"",
      contactImage:"",
      companyName:"",
      countryName:"",
      email:"",
      firstName:"",
      jobTitle:"",
      lastName:"",
      phoneNumber:"",
      prefix:"",
      state:"",
      streetAddress:"",
      website:"",
   })

   function handleContactInfoChange(e){
      const { name, value } = e.target;
      setContactDetails(prevInfo => {
         return {...prevInfo,[name]:value}
      })
   }

   function handleContactPhoneInput(value,e){
      setContactDetails(prevInfo => {
         return {...prevInfo,phoneNumber:value}
      })
   }

   useEffect(() => {
      const emptyInput = Object.values(contactDetails).some(value => value !== null && value !== "")
      if(emptyInput){
         setDisableSave(false)
      }else{
         setDisableSave(true)
      }
   },[contactDetails])


   async function handleContactCreateSubmit(e){
      e.preventDefault()
      dispatch(setLoading(true))
      await dispatch(setNewContact(contactDetails))
      
      if(!error){
         setOpenSnackbar(true)
         setTimeout(() => {
            navigate("/")
            dispatch(setLoading(false))
         }, 2000);
      }else{
         dispatch(setLoading(false))
      } 
   }

   return(
      <section className="create-contact-section main-content">
         <div className="heading flex-row">

            <button onClick={() => navigate(-1)}  className="cancel-create" >
              <RxCross1 />
            </button>

            <div className="image-upload">
               {
                  contactDetails.contactImage &&
                  <img src={contactDetails.contactImage} alt="contact image" title="Upload Contact Image" />
               }
               <input type="file" onChange={(e)  => handleImageFileUpload(e,setContactDetails)} className="image-upload-input" />
               <FcAddImage className="image-upload-placeholder" />
               <div className="image-upload-output"></div>
            </div>
            <button className="save-btn" onClick={handleContactCreateSubmit} disabled={disableSave}>Save</button>
         </div>
         <button onClick={() =>  setShowMore(!showMore)} className="show-more-btn">{showMore ? "Show Less" : "Show More"}</button>
        
         <CreateContactForm
            handleContactInfoChange={handleContactInfoChange}
            id={id}
            showMore={showMore}
            contactDetails={contactDetails}
            handleContactPhoneInput={handleContactPhoneInput}
         />

         {
            error &&
            <Alert severity="error" className="alert-box">
               <span>
                  {error} — Try Again!
               </span>
            </Alert>
         }
         <Loading set={isLoading} />
         <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={() => setOpenSnackbar(false)}
            message="Contact Added"
         />
      </section>
   )
}