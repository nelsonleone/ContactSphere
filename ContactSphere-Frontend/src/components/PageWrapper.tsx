import { ReactNode } from "react";
import  { HeadProvider, Title } from 'react-head'
import NavMenu from "./Navigation/MainNavHandler";
import { useAppSelector } from "../customHooks/reduxCustomHooks";

interface IPageWrapperProps {
   title: string,
   className: string,
   children: ReactNode,
   fetchingContacts: boolean
}

export default function PageWrapper(props:IPageWrapperProps){

   const {
      title,
      className,
      children,
      fetchingContacts
   } = props;
   const { openNav } = useAppSelector(store => store.openNav)

   return(
      <HeadProvider>
         <div className={`page ${className} ${openNav ? 'resize-page' : ''}`}>
           <Title>{`${title}`}</Title>
            <NavMenu />
            {
               !fetchingContacts ?
               <div>
                 {children}
               </div>
               :
               <InPageLoader />
            }
         </div>
      </HeadProvider>
   )
}