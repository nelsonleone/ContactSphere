/// <reference types="vite/client" />

import { Dispatch, RefObject, SetStateAction } from "react";
import { IHeaderState } from "./components/Header";
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';



type Sites = "facebook" | "instagram" | "snapchat" | "twitter" | "youtube" | ""

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
  birthday:  Date | string,
  email: string;
  companyName: string;
  department: string;
  firstName: string;
  jobTitle: string;
  lastName: string;
  labelledBy: {
    name?: string
    label: string
  }[] | [];
  middleName: string;
  nickname: string;
  phoneNumber: string;
  prefix: string;
  repPhoto: string;
  relatedPeople: {
    name: string;
    label: string;
  }[];
  social: {
    site: Sites | string,
    handle: string
  }
  suffix: string;
  website: string;
}

interface IContactsFromDB extends Contact {
  _id: Readonly<string>,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  inTrash: boolean,
  isHidden: boolean,
  name: string
  inFavourites: boolean
}


interface ILabelObj {
  label: string,
  _id: Readonly<string>,
}

type UserLabels = ILabelObj[]

type UserData = {
  contacts: IContactsFromDB[],
  labels: UserLabels | []
}



interface Duplicate extends IContactsFromDB {
  mergeRef: string
}

interface IServerResponseObj {
  message: string
}


type ColumnOrderData = { colName:string,order:number }[]


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