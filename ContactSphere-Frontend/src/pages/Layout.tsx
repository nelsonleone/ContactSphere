import { ReactNode, useState } from "react";
import Loader from "../../lib/loaders/Loader";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import Header from "../components/Header";

export default function Layout({children}:{ children:ReactNode}){

   const [resizePageWidth, setResizePageWidth] = useState(window.innerWidth > 900)

   return(
      <div className={resizePageWidth ? "app-layout resize-page" : "app-layout"}>
         <Header setResizePageWidth={setResizePageWidth} />
         <Create
         {children}
         <CustomSnackbar />
         <CustomAlert />
         <Loader />
      </div>
   )
}