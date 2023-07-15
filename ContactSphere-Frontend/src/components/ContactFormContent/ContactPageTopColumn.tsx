import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../../customHooks/reduxCustomHooks";

const columnLabels = [
   {
      label: 'name',
      id: 'name-col',
      innerText: 'Name'
   },
   {
      label: 'email',
      id: 'email-col',
      innerText: 'Email',
   },
   {
      label: 'phone-number',
      id: 'phone-col',
      innerText: 'Phone Number',
   },
   {
      label: 'job-title',
      id: 'jobTitle-col',
      innerText: 'Job Title',
   }
]

function ContactPageTopColumn() {
   const { columnOrder } = useAppSelector((store) => store.userLocalSetting)
 
   return (
     <div className="contacts_view_top_section">
       <ul>
         {columnOrder.map((obj) => {
            const labelObject = columnLabels.find(
               (val) => val.label === obj.colName
            )
   
            if (labelObject) {
               return (
                  <li
                     id={labelObject.id}
                     key={labelObject.id}
                     style={{ order: obj.order }}
                     >
                     {labelObject.innerText}
                  </li>
               )
            }
           return null;
         })}
       </ul>
     </div>
   )
}
 
export default ContactPageTopColumn;