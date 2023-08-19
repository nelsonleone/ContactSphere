import { ReactNode } from "react";
import Loader from "../../lib/loaders/Loader";
import CreateNewContactButton from "../../lib/buttons/CreateNewContactButton";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import BasicModal from "../../lib/popups/CustomSimpleModal";
import CustomWrkSnackbar from "../../lib/popups/CustomWrkSnackbar";
import Header from "../components/Header";

export default function Layout({children}:{ children:ReactNode}){

   return(
      <div className="app-layout" >
         <Header />
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