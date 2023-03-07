import { AiFillStar } from "react-icons/ai"
import { GoTriangleDown } from "react-icons/go"
import { CiUser } from "react-icons/ci"
import { MdWork, MdOutlineEmail , MdOutlineLocationOn} from "react-icons/md"
import { BsTelephone } from "react-icons/bs"
import { FaBirthdayCake } from "react-icons/fa"
import { BiServer } from "react-icons/bi"
import { useState, useEffect, useId } from "react"
import { useDispatch } from "react-redux"
import { handleContactStarring } from "../redux/features/asyncThunks"
import ContactImage from "./ContactImage"
import phoneNumberStringFormatter from "./Helper/phoneNumberStringFormatter"

export default function StarredContactItem(props){
   const {
      birthday,
      email,
      phoneNumber,
      jobTitle,
      companyName,
      prefix,
      firstName,
      lastName,
      contactImage,
      countryName,
      cityName,
      website,
      streetAddress,
      state
   } = props.contactInfo;

      
   const { setStarredContactRemoved } = props;

   const [showMoreContent,setShowMoreContent] = useState(false)
   const id = useId()
   const dispatch = useDispatch()


   async function handleStarIconClick(e){
      e.stopPropagation()
      await dispatch(handleContactStarring(props.contactInfo))
      setStarredContactRemoved(true)
   }

   return(
      <div className="starred-contactItem" onClick={() => setShowMoreContent(!showMoreContent)} aria-controls={`${id}contact-fullContent`}>
         <div className="starred-contactItem-lessDisplay">
            <h4>
               <span className="prefix">{prefix}</span>
               <span>{firstName}</span>
               <span>{lastName}</span>
            </h4>
            <button className="remove-star-btn" onClick={handleStarIconClick}>
               <AiFillStar />
            </button>
            <GoTriangleDown className={showMoreContent ?  "arrow-icon arrow-icon-rotate" : "arrow-icon"}/>
         </div>

         <div 
           id={`${id}contact-fullContent`}
           className={!showMoreContent ? "starred-contactItem-moreContent" : "starred-contactItem-moreContent showMore-content" }
           >
            <div className="contact-image-container">
               <ContactImage image={contactImage} />
            </div>
            <div className="work-area">
               <MdWork className="icon" />
               <h3>{companyName}</h3>
               <p>{jobTitle}</p>
            </div>
            <div className="contact-area">
               {
                  email &&
                  <p>
                     <MdOutlineEmail className="icon" />
                     {email}
                  </p>
               }
               {
                  phoneNumber &&
                  <p>
                     <BsTelephone className="icon" />
                     {phoneNumberStringFormatter(phoneNumber)}
                  </p>
               }
               {
                  website &&
                  <p>
                     <BiServer className="icon" />
                     {website}
                  </p>
               }
            </div>
            <div className="address-area">
               {
                  countryName || state || cityName || streetAddress ?
                  <MdOutlineLocationOn  className="icon" />
                  :
                  ""
               }
               <h3>{countryName}</h3>
               <p>{state}</p>
               <p>{cityName}</p>
               <p>{streetAddress}</p>
            </div>
            {
               birthday &&
               <div className="birthday-area">
                  <FaBirthdayCake  className="icon" />
                  <p>{birthday}</p>
               </div>
            }
         </div>
      </div>
   )
}