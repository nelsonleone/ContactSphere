import { ReactNode, useState } from "react";
import Loader from "../../lib/loaders/Loader";
import CreateNewContactButton from "../../lib/buttons/CreateNewContactButton";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';

export default function Layout({children}:{ children:ReactNode}){

   const [resizePageWidth, setResizePageWidth] = useState(window.innerWidth > 960)
   const location = useLocation()

   return(
      <div className={resizePageWidth ? "app-layout resize-page" : "app-layout"}>
         <Header setResizePageWidth={setResizePageWidth} />
         {
            location.pathname !== "/new" ?
            <CreateNewContactButton />
            :
            null
         }
         {children}
         <CustomSnackbar />
         <CustomAlert />
         <Loader />
      </div>
   )
}