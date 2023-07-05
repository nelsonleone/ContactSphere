import ContactForm from "../components/ContactFormContent/ContactForm";
import { ContactFormAction } from "../enums";

function EditContactPage() {
  return (
    <main className="page create_contact_page edit_contact_page">
      <ContactForm action={ContactFormAction.Edit} />
    </main>
  )
}

export default EditContactPage;