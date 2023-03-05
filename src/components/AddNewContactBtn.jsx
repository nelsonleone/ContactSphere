import { BiPlus } from "react-icons/bi"
import { useNavigate } from "react-router-dom"


export default function AddNewContactBtn(){
   const navigate = useNavigate()

   return(
      <div className="add-contactBtn-container" title="Add New Contact">
         <button onClick={() => navigate("create-contact")}>
           <span className="AT-only">Create New Contact</span>
            <BiPlus  className="add-icon"/>
         </button>
      </div>
   )
}