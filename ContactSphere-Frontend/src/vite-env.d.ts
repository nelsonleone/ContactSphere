/// <reference types="vite/client" />

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