/// <reference types="vite/client" />

import { Dispatch, RefObject, SetStateAction } from "react";
import { IHeaderState } from "./components/Header";

type IFormData = {
   email: {
      value: string,
      error: string | null,
   },
   password: {
      value: string,
      error: string | null,
   }
   displayName?: {
      value: string,
      error: string | null,
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