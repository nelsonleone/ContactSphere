import { useNavigate } from "react-router-dom";
import PhotoUrlAvatar from "../../../lib/Avatars/PhotoUrlAvatar";
import { Duplicate } from "../../vite-env";
import { formatPhoneNumberIntl } from "react-phone-number-input";

interface IProps extends Duplicate{}

export default function DuplicateContact(props:IProps){

   const navigate = useNavigate()

   return(
      <div className="duplicate_contact" onClick={() => navigate(`/c/${props._id}`)}>
         <PhotoUrlAvatar nameForAlt={`${props.firstName} ${props.lastName}`} photoURL={props.repPhoto} size={38} />

         <div>
            <p>{props.name || `${props.firstName} ${props.lastName}`}</p>
            <span>{formatPhoneNumberIntl(props.phoneNumber)}</span>
         </div>
      </div>
   )
}