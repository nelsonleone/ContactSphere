import { ReactNode, useState } from "react";
import Loader from "../../lib/loaders/Loader";
import CreateNewContactButton from "../../lib/buttons/CreateNewContactButton";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import BasicModal from "../../lib/popups/CustomSimpleModal";
import CustomWrkSnackbar from "../../lib/popups/CustomWrkSnackbar";
import Header from "../components/Header";
import { Breakpoints } from "../enums";

export default function Layout({children}:{ children:ReactNode}){

   const [resizePageWidth, setResizePageWidth] = useState(window.innerWidth >= Breakpoints.Large)
   return(
      <div className={resizePageWidth ? "app-layout resize-page" : "app-layout"}>
         <Header setResizePageWidth={setResizePageWidth} />
         <CreateNewContactButton />
         {children}
         <CustomSnackbar />
         <CustomWrkSnackbar />
         <CustomAlert />
         <BasicModal />
         <Loader />
      </div>
   )
}