import ContactForm from '../components/ContactFormContent/ContactForm'
import PageWrapper from '../components/PageWrapper'
import { ContactFormAction } from '../enums'

function CreateContact() {
   return (
      <PageWrapper className="create_contact_page" title="ContactSphere | Create Contact">
        <main>
            <ContactForm action={ContactFormAction.Create} />
         </main>
      </PageWrapper>
  )
}

export default CreateContact