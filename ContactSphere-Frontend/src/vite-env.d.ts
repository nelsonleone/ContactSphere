/// <reference types="vite/client" />

import { Dispatch, RefObject, SetStateAction } from "react";
import { IHeaderState } from "./components/Header";
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';



type IFormData = {
   email: string,
   password: string
   displayName: string
}

interface ICustomInputsProps {
   registerField:  UseFormRegister<IFormData>,
   error: string | undefined,
   setValue?: UseFormSetValue<IFormData>
}

interface ICustomInputsProps_Password extends ICustomInputsProps {
   getValues: UseFormGetValues<IFormData>
}


type UserCredentials = {
   email: string,
   displayName: string | null,
   password: string,
   uid: string
}



// Componentss Thats Uses The OutsideClick HOC
type ComponentStateName = keyof IHeaderState;

type UsedHOC = {
  setState: Dispatch<SetStateAction<IHeaderState>>,
  componentStateName: ComponentStateName,
  togglerRef: RefObject<HTMLButtonElement>,
  openNav?: boolean,
  openUserMenu?: boolean,
  stop?: boolean
}




// Contact

interface IAddressProperties {
   country: string,
   city: string,
   street: string
}

type Contact = {
   address?: IAddressProperties,
   email?: string,
   companyName?: string,
   inTrash: boolean,
   isActive: boolean,
   isHidden: boolean,
   jobTitle?: string,
   labelledBy?: string,
   name: string
   phoneNumber: number,
   repPhoto?: string
}