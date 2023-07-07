import ContactForm from "../components/ContactFormContent/ContactForm";
import PageWrapper from "../components/PageWrapper";
import { ContactFormAction } from "../enums";
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../customHooks/reduxCustomHooks'
import { useEffect, useState } from "react";
import { IContactsFromDB } from "../vite-env";
import setEditFormDefaultValues from "../utils/helperFns/setEditFromDefaultValues";
import ErrorIdParamsMsg from "../components/ContactFormContent/ErrorIdParamsMsg";

function EditContactPage() {

  const { id } = useParams()
  const { contacts } = useAppSelector(store => store.userData)
  const [contactForEdit,setContactForEdit]= useState<IContactsFromDB | undefined>(contacts.find(c => c._id.toString() === id?.toString()))

  useEffect(() => {
    setContactForEdit(contacts.find(c => c._id.toString() === id?.toString()))
  },[id])

  return (
    contactForEdit ? 
    <PageWrapper className="create_contact_page edit_contact_page" desc="Edit Your Contacts" title="ContactSphere | Edit">
      <ContactForm contactId={contactForEdit?._id} defaultValue={setEditFormDefaultValues(contactForEdit)} action={ContactFormAction.Edit} />
    </PageWrapper>
    :
    <ErrorIdParamsMsg />
  )
}

export default EditContactPage;