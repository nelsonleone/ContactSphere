import { useFieldArray, useForm } from "react-hook-form"
import { defaultValues } from "./newContactDefaultValues"
import { Contact } from "../../vite-env"
import { useState } from "react"
import NameInputSection from "./input_sections/NameSection"
import FormalInputSection from "./input_sections/FormalInputSection"
import ContactInputSection from "./input_sections/ContactInputSection"
import AddressInputSection from "./input_sections/AddressInputSection"
import { InputPropertyValueName } from "../../enums"
import AdditionalFields from "./input_sections/AdditionalFields"

export default function ContactForm(){

   const {register,handleSubmit,setValue} = useForm<Contact>({defaultValues})
   const { fields } = useFieldArray<Contact>({ name: InputPropertyValueName.RelatedPeople })
   const [showMore,setShowMore] = useState<boolean>(false)

   const handleOnSubmit = async() => {}

   return(
      <form onSubmit={handleSubmit(handleOnSubmit)}>
         <NameInputSection showMore={showMore} register={register} />
         <FormalInputSection showMore={showMore} register={register} />
         <ContactInputSection setValue={setValue} register={register} />
         <AddressInputSection showMore={showMore} register={register}  />
         <AdditionalFields fields={fields} register={register} showMore={showMore} />
      </form>
   )
}
