import { RxCross1 } from "react-icons/rx"
import { FcAddImage } from "react-icons/fc"
import { CiUser } from "react-icons/ci"
import { MdWork, MdOutlineEmail , MdOutlineLocationOn} from "react-icons/md"
import { BsTelephone } from "react-icons/bs"
import { FaBirthdayCake } from "react-icons/fa"
import { BiServer } from "react-icons/bi"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"

export default function EditContactForm(props){
   
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
                  <label htmlFor={`${id}editContactNamePrefix`}>Prefix</label>
                  <input 
                     type="text"
                     id={`${id}editContactNamePrefix`}
                     placeholder="Prefix"
                     name="prefix" 
                     onChange={handleContactInfoChange}
                     value={contactDetails.prefix}
                  />
               </div>
            }
            <div className="input-container">
               <label htmlFor={`${id}editContactFirstname`}>First Name</label>
               <input 
               type="text"
               id={`${id}editContactFirstName`}
               placeholder="First Name"
               name="firstName"
               onChange={handleContactInfoChange}
               value={contactDetails.firstName}

               />
            </div>
            <div className="input-container">
               <label htmlFor={`${id}editContactLastName`}>Last  Name</label>
               <input 
               type="text"
               id={`${id}editContactLastName`}
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
               <label htmlFor={`${id}editContactCompanyName`} >Company</label>
               <input 
               type="text"
               id={`${id}editContactCompanyName`}
               placeholder="Company"
               name="companyName"
               onChange={handleContactInfoChange}
               value={contactDetails.companyName}
               />
            </div>
            <div className="input-container">
               <label htmlFor={`${id}editContactJobTitle`}>Job Title</label>
               <input 
                  type="text"
                  id={`${id}editContactJobTitle`}
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
               <label htmlFor={`${id}editContactEmail`}>Email</label>
               <input 
               type="email"
               id={`${id}editContactEmail`}
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
               <label htmlFor={`${id}editContactPhone`}>Phone Number</label>
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
               <label htmlFor={`${id}editContactBirthday`}>
                  <span className="AT-only">Birthday</span>
                  dd/mm/yy
               </label>
               <input 
                  type="text"
                  id={`${id}editContactBirthday`}
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
                     <label htmlFor={`${id}editContactWebsite`}>Website</label>
                     <input 
                        type="text"
                        id={`${id}editContactWebsite`}
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
                     <label htmlFor={`${id}editContactCountryAddress`} >Country</label>
                     <input 
                        type="text"
                        id={`${id}editContactCountryAddress`}
                        placeholder="Country"
                        name="countryName"
                        onChange={handleContactInfoChange}
                        value={contactDetails.countryName}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}editContactStateAddress`}>State</label>
                     <input 
                        type="text"
                        id={`${id}editContactStateAddress`}
                        placeholder="State"
                        name="state"
                        onChange={handleContactInfoChange}
                        value={contactDetails.state}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}editContactCityAddress`}>City</label>
                     <input 
                        type="text"
                        id={`${id}editContactCityAddress`}
                        placeholder="City"
                        name="cityName"
                        onChange={handleContactInfoChange}
                        value={contactDetails.cityName}
                     />
                  </div>
                  <div className="input-container">
                     <label htmlFor={`${id}editContactStreetAddress`}>Street</label>
                     <input 
                        type="text"
                        id={`${id}editContactStreetAddress`}
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