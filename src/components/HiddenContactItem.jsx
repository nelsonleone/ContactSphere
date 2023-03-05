import { GrView }  from "react-icons/gr"
import { useDispatch } from "react-redux";
import { setHidenContact } from "../redux/features/asyncThunks";

export default function HiddenContactItem(props){


   const {
      isStarred,
      email,
      phoneNumber,
      jobTitle,
      companyName,
      prefix,
      firstName,
      lastName,
      contactImage
   }  =  props.contactInfo;

   const { setContactVisible } = props;
   const dispatch = useDispatch()

   async function handleSetContactVisible(){
      await dispatch(setHidenContact(props.contactInfo))
      setContactVisible(true)
   }

   return(
      <>
         <div className="contact hidden-contact">
            <div className="name_image-container">
               <img src={contactImage ? contactImage : "/images/userIcon.webp"} alt="contact image" className="contactUser-image" />
               <span className="contact-name" aria-label="hidden-name-header">
                  <span>{prefix}</span>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
               </span>
            </div>
            <span className="hide-for-mobile" aria-label="hidden-email-header">{email}</span>
            <span className="hide-for-mobile" aria-label="hidden-phoneNumber-header">{phoneNumber}</span>
            <span className="hide-for-mobile work" aria-label="hidden-work-header">{jobTitle}/{companyName}</span>

            <button
               title="Make Contact Visible"
               onClick={handleSetContactVisible}
            >
               <GrView className="visible-icon"/>
            </button>
         </div>
      </>
   )
}