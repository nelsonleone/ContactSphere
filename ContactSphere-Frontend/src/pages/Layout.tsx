import { ReactNode, useState } from "react";
import Loader from "../../lib/loaders/Loader";
import CreateNewContactButton from "../../lib/buttons/CreateNewContactButton";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import Header from "../components/Header";

export default function Layout({children}:{ children:ReactNode}){

   const [resizePageWidth, setResizePageWidth] = useState(window.innerWidth > 900)

   return(
      <div className={resizePageWidth ? "app-layout resize-page" : "app-layout"}>
         <Header setResizePageWidth={setResizePageWidth} />
         <CreateNewContactButton />
         {children}
         <CustomSnackbar />
         <CustomAlert />
         <Loader />
      </div>
   )
}