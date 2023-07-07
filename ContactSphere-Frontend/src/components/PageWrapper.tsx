import { ReactNode } from "react";
import  { HeadProvider, Title, Meta } from 'react-head'

export default function PageWrapper({className,children,desc,title}:{ desc:string,title:string,className:string, children:ReactNode }){
   return(
      <HeadProvider>
         <div className={`page ${className}`}>
           <Title>{`${title}`}</Title>
           <Meta name="decription" content={desc} />
            {children}
         </div>
      </HeadProvider>
   )
}