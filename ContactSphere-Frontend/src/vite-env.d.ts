/// <reference types="vite/client" />

import { Dispatch, RefObject, SetStateAction } from "react";
import { IHeaderState } from "./components/Header";

type IFormFieldError = {
   message: string
} | null


type IFormData = {
   email: {
      value: string,
      error: IFormFieldError,
   },
   password: {
      value: string,
      error: IFormFieldError,
   },
   displayName: {
      value: string,
      error: IFormFieldError
   }
}



type UserCredentials = {
   email: string,
   displayName?: string,
   password: string
}


type AuthUserDetails = {
   email: string,
   displayName: string,
   photoURL?: string,
   _id: string
}



type ComponentStateName = keyof IHeaderState;

type UsedHOC = {
  setState: Dispatch<SetStateAction<IHeaderState>>,
  componentStateName: ComponentStateName,
  togglerRef: RefObject<HTMLButtonElement>,
  openNav?: boolean,
}