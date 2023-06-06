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
   displayName?: string,
   password: string,
   uid: string
}



type ComponentStateName = keyof IHeaderState;

type UsedHOC = {
  setState: Dispatch<SetStateAction<IHeaderState>>,
  componentStateName: ComponentStateName,
  togglerRef: RefObject<HTMLButtonElement>,
  openNav?: boolean,
}