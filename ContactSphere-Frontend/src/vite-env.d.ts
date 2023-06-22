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
  setState: Dispatch<SetStateAction<IHeaderState>> | Dispatch<SetStateAction<boolean>>,
  componentStateName?: ComponentStateName,
  togglerRef: RefObject<HTMLButtonElement>,
  openNav?: boolean,
  openUserMenu?: boolean,
  stop?: boolean
}




// Contact

interface IAddressProperties {
  country: string,
  state: string,
  city: string,
  street: string,
  postalCode: string
}

type Contact = {
  address: IAddressProperties,
  birthday: string,
  email: string;
  chat: string;
  companyName: string;
  department: string;
  firstName: string;
  inTrash: boolean;
  isActive: boolean;
  isHidden: boolean;
  jobTitle: string;
  lastName: string;
  labelledBy: {
    name?: string
    label: string
  }[] | [];
  middleName: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  prefix: string;
  repPhoto: string;
  relatedPeople: {
    name: string;
    label: string;
  }[];
  suffix: string;
  website: string;
}

interface IContactsFromDB extends Contact {
  _id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}




type UserData = {
  contacts: Contact[],
  labels: {
    _id: string,
    label: string
  }[] | []
}



// country list for dropdown
type countryDataObj = {
  name:{
    common:string,
    official:string,
    nativeName:{
      dan:{
        official:string,
        common:string
      },
      fao:{
        official: string,
        common:string
      }
    }
  }
}