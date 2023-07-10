import { ReactNode } from "react";
import  { HeadProvider, Title } from 'react-head'

export default function PageWrapper({className,children,title}:{ title:string,className:string, children:ReactNode }){
   return(
      <HeadProvider>
         <div className={`page ${className}`}>
           <Title>{`${title}`}</Title>
            {children}
         </div>
      </HeadProvider>
   )
}