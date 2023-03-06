import { useParams } from "react-router-dom"
import { RxCross1 } from "react-icons/rx"
import ContactImage from "../components/ContactImage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect , useState} from "react"
import { getViewedContactDetails } from "../redux/features/asyncThunks"
import {useNavigate} from "react-router-dom"
import phoneNumberStringFormatter from "../components/Helper/phoneNumberStringFormatter"

export default function ContactView(){

   const { contactId } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {isFetching, viewedContactDetails:{
      birthday,
      cityName,
      contactImage,
      companyName,
      countryName,
      email,
      firstName,
      jobTitle,
      lastName,
      phoneNumber,
      prefix,
      state,
      streetAddress,
      website,
   },} = useSelector(store => store.contact)
   
   const [showContact,setShowContact] = useState(false)

   useEffect(() =>  {
      dispatch(getViewedContactDetails(contactId))
   },[])

   useEffect(() => {
      if(!isFetching){
         setShowContact(true)
      }
   },[isFetching])

   return(
      <div className="main-content viewed-contact">
         {
            showContact ?
            <>
               <div className="heading-area">
                  <RxCross1 className="close-icon" onClick={() => navigate(-1)} aria-label="close the page and navigate back to previous page" />
                  <ContactImage image={contactImage} />
                  <button className="edit-btn" aria-label="Edit This Contact" onClick={() => navigate(`/edit/${contactId}`)}>Edit</button>
               </div>

               <div className="full-details">
                  <div className="name-area">
                     <h3>Name</h3>
                     <p>{prefix}</p>
                     <p>{firstName}</p>
                     <p>{lastName}</p>
                  </div>
                  <div className="work-area">
                     <h3>Formal Details</h3>
                     <p>{companyName}</p>
                     <p>{jobTitle}</p>
                  </div>
                  <div className="contact-area">
                     <h3>Contact Information</h3>
                     <p>
                        Phone Number:
                        <span>{phoneNumberStringFormatter(phoneNumber)}</span>
                     </p>
                     <p>Email:
                       <span>{email}</span>
                     </p>
                     <p>Website:
                       <span>{website}</span>
                     </p>
                  </div>
                  <div className="address-area">
                     <h3>Address Details</h3>
                     <p>Country:
                       <span>{countryName}</span>
                     </p>
                     <p>State:
                       <span>{state}</span>
                     </p>
                     <p>City Name:
                       <span>{cityName}</span>
                     </p>
                     <p>Street Address:
                       <span>{streetAddress}</span>
                     </p>
                  </div>
                  <div className="birthday-area">
                     <h3>Birthday</h3>
                     <p>{birthday}</p>
                  </div>
               </div>
            </>
            :
            <h2 className="loading-text">Getting Details.....</h2>  
         }
      </div>
   )
}