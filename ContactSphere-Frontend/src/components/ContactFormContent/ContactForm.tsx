import { useForm } from "react-hook-form"
import { defaultValues } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { useId, useState } from "react"
import NewContactFormInput from '../../../lib/customInputs/NewContactFormInput'

export default function ContactForm(){

   const {register,handleSubmit} = useForm<Contact>({defaultValues})
   const [showMore,setShowMore] = useState<boolean>(false)
   const id = useId()

   const handleOnSubmit = async() => {}

   return(
      <form onSubmit={handleSubmit(handleOnSubmit)}>
         <div className="name_section">
            <NewContactFormInput
               placeholder="Prefix"
               label="Prefix"
               id={`${id}-prefix`}
               type="text"
            />
         </div>
      </form>
   )
}