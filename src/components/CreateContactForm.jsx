import { RxCross1 } from "react-icons/rx"
import { FcAddImage } from "react-icons/fc"
import { CiUser } from "react-icons/ci"
import { MdWork, MdOutlineEmail , MdOutlineLocationOn} from "react-icons/md"
import { BsTelephone } from "react-icons/bs"
import { FaBirthdayCake } from "react-icons/fa"
import { BiServer } from "react-icons/bi"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"


export default function CreateContactForm(props){

   const {
      handleContactInfoChange,
      id,
      showMore,
      contactDetails,
      handleContactPhoneInput
   } = props;

   return(
      <form>
         <div className="name-area">
            <CiUser className="name-area-icon icon" />
            {
               showMore &&
               <div className="input-container">
                  <label htmlFor={`${id}createContactNamePrefix`}>Prefix</label>
                  <input 
                     type="text"
                     id={`${id}createContactNamePrefix`}
                     placeholder="Prefix"
                     name="prefix" 
                     onChange={handleContactInfoChange}
                     value={contactDetails.prefix}
                  />
               </div>
            }
            <div className="input-container">
               <label htmlFor={`${id}createContactFirstname`}>First Name</label>
               <input 
               type="text"
               id={`${id}createContactFirstName`}
               placeholder="First Name"
               name="firstName"
               onChange={handleContactInfoChange}
               value={contactDetails.firstName}

               />
            </div>
            <div className="input-container">
               <label htmlFor={`${id}createContactLastName`}>Last  Name</label>
               <input 
               type="text"
               id={`${id}createContactLastName`}
               placeholder="Last Name"
               name="lastName"
               onChange={handleContactInfoChange}
               value={contactDetails.lastName}
               />
            </div>
         </div>

         <div className="work-area">
            <MdWork className="work-area-icon icon" />
            <div className="input-container">
               <label htmlFor={`${id}createContactCompanyName`} >Company</label>
               <input 
               type="text"
               id={`${id}createContactCompanyName`}
               placeholder="Company"
               name="companyName"
               onChange={handleContactInfoChange}
               value={contactDetails.companyName}
               />
            </div>
            <div className="input-container">
               <label htmlFor={`${id}createContactJobTitle`}>Job Title</label>
               <input 
                  type="text"
                  id={`${id}createContactJobTitle`}
                  placeholder="Job Title"
                  name="jobTitle"
                  onChange={handleContactInfoChange}
                  value={contactDetails.jobTitle}
               />
            </div>
         </div>

         <div className="email-area">
            <MdOutlineEmail className="email-area-icon icon" />
            <div className="input-container">
               <label htmlFor={`${id}createContactEmail`}>Email</label>
               <input 
               type="email"
               id={`${id}createContactEmail`}
               placeholder="Email"
               name="email"
               onChange={handleContactInfoChange}
               value={contactDetails.email}
               />
            </div>
         </div>

         <div className="phone-area">
            <BsTelephone className="phone-area-icon icon" />
            <div className="input-container">
               <label htmlFor={`${id}createContactPhone`}>Phone Number</label>
               <PhoneInput
                  className="phone-input"
                  placeholder="Phone"
                  name="phoneNumber"
                  onChange={handleContactPhoneInput}
                  value={contactDetails.phoneNumber}
               />
            </div>
         </div>

         <div className="birthday-area">
            <FaBirthdayCake className="birthday-area-icon icon" />
            <div className="input-container">
               <label htmlFor={`${id}createContactBirthday`}>
                  <span className="AT-only">Birthday</span>
                  dd/mm/yy
               </label>
               <input 
                  type="text"
                  id={`${id}createContactBirthday`}
                  placeholder="Birthday"
                  name="birthday"
                  onChange={handleContactInfoChange}
                  value={contactDetails.birthday}
               />
            </div>
         </div>

         {
            showMore &&
            <>
               <div className="website-area">
                  <BiServer className="website-area-icon icon" />
                  <div className="input-container">
                     <label htmlFor={`${id}createContactWebsite`}>Website</label>
                     <input 
                        type="text"
                        id={`${id}createContactWebsite`}
                        placeholder="Website"
                        name="website"
                        onChange={handleContactInfoChange}
                        value={contactDetails.website}
                     />
                  </div>
               </div>

               <div className="address-area">
                  <MdOutlineLocationOn className="address-area-icon icon" />
                  <div className="input-container">
                     <label htmlFor={`${id}createContactCountryAddress`} >Country</label>
                     <input 
                        type="text"
                        id={`${id}createContactCountryAddress`}
                        placeholder="Country"
                        name="countryName"
                        onChange={handleContactInfoChange}
                        value={contactDetails.countryName}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}createContactStateAddress`}>State</label>
                     <input 
                        type="text"
                        id={`${id}createContactStateAddress`}
                        placeholder="State"
                        name="state"
                        onChange={handleContactInfoChange}
                        value={contactDetails.state}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}createContactCityAddress`}>City</label>
                     <input 
                        type="text"
                        id={`${id}createContactCityAddress`}
                        placeholder="City"
                        name="cityName"
                        onChange={handleContactInfoChange}
                        value={contactDetails.cityName}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}createContactStreetAddress`}>Street</label>
                     <input 
                        type="text"
                        id={`${id}createContactStreetAddress`}
                        placeholder="Street"
                        name="streetAddress"
                        onChange={handleContactInfoChange}
                        value={contactDetails.streetAddress}
                     />
                  </div>
               </div>
            </>

         }
      </form>
   )
}