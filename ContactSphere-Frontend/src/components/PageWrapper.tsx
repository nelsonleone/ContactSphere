import { ReactNode } from "react";
import Head, { Title } from 'react-head'

export default function PageWrapper({className,children}:{ className:string, children:ReactNode }){
   return(
      <div className={`page ${className}`}>
         {children}
      </div>
   )
}