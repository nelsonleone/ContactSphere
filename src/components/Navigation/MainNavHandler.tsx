import { useNavigate } from "react-router-dom";
import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../customHooks/reduxCustomHooks'
import { Breakpoints } from "../../enums";
import clientAsyncHandler from "../../utils/helperFns/clientAsyncHandler";
import { useEditUserLabelMutation, useRemoveUserLabelMutation } from "../../RTK/features/api/injectedContactsApiQueries";
import handleAsyncRemoveUserLabel from "../../utils/helperFns/handleAsyncRemoveUserLabel";
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions";
import postEdittedLabel from "../../utils/helperFns/postEdittedLabel";
import { ILabelObj } from "../../vite-env";
import { setThereAreChanges } from "../../RTK/features/slices/shouldDiscardChangesSlice";
import { setOpenNav } from "../../RTK/features/slices/openNavMenuSlice";
import MainNav from "./MainNav";

function NavMenu(){

   const { userDetails: { uid }} = useAppSelector(store => store.authUser)
   const { contacts } = useAppSelector(store => store.userData)
   const activeContacts = contacts.filter(c => !c.isHidden && !c.inTrash)
   const [addLabelMode,setAddLabelMode] = useState<"edit"|"create">("edit")

   const [labelForEdit,setLabelForEdit] = useState<ILabelObj>({
      label: "",
      _id: ""
   })
   const [openDialog,setOpenDialog] = useState(false)
   const [oldLabel,setOldLabel] = useState("")
   const  [removeLabel] = useRemoveUserLabelMutation()
   const [editLabel] = useEditUserLabelMutation()
   const dispatch = useAppDispatch()
   const { thereAreChanges } = useAppSelector(store => store.shouldDiscardChanges)
   const [nextPage,setNextPage] = useState("")
   const [showDiscardDialog,setShowDiscardDialog] = useState(false)
   const navigate = useNavigate()
   
   const handleClickAway = () => {
      // don't close navMenu automatically on larger screens
      if (window.innerWidth >= Breakpoints.Large )return;

      dispatch(setOpenNav(false))
   }

   const checkContactsWithLabel = (label:string) => {
      const withLabel = activeContacts.filter(c => c.labelledBy.some(obj => obj.label === label)).length;
      return withLabel >  0 ? withLabel : "";
   }

   const handleLabelDelete = (label:string) => clientAsyncHandler(
      async() => {
         await stopUnauthourizedActions(uid)
         await handleAsyncRemoveUserLabel(
            removeLabel,
            uid!,
            dispatch,
            label
         )
      },
      dispatch
   )

   const handleOpenDialog = (labelObj:ILabelObj) => {
      setLabelForEdit(labelObj)
      setOldLabel(labelObj.label)
      setOpenDialog(true)
   }

   const handleLabelEdit = () => clientAsyncHandler(
      async() => {
         await stopUnauthourizedActions(uid)
         await postEdittedLabel(
            editLabel,
            dispatch,
            labelForEdit.label,
            uid!,
            labelForEdit._id,
            oldLabel
         )
      },
      dispatch
   )

   // Set Edit Contents To Null, So Dialog Opens In Creation Mode
   const handleCreateLabelBtnClick = () => {
      setLabelForEdit({_id:"",label:""})
      setAddLabelMode("create")
      setOpenDialog(true)
   }



   // Prompt User Before Navigation If There Are Changes Made In Create\Edit Contact Pages
   const handleNavigate = (e:MouseEvent<HTMLAnchorElement>) => {
      if(thereAreChanges){
         e.preventDefault()
         setShowDiscardDialog(true)
         setNextPage(e.currentTarget.pathname)
      }
   }

   const handleDialogAction = ()  => {
      setShowDiscardDialog(false)
      dispatch(setThereAreChanges(false))
      navigate(nextPage)
   }



   return(
      <MainNav 
        labelForEdit={labelForEdit}
        setLabelForEdit={setLabelForEdit}
        handleClickAway={handleClickAway}
        handleCreateLabelBtnClick={handleCreateLabelBtnClick}
        handleDialogAction={handleDialogAction}
        handleLabelDelete={handleLabelDelete}
        handleLabelEdit={handleLabelEdit}
        handleNavigate={handleNavigate}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setShowDiscardDialog={setShowDiscardDialog}
        showDiscardDialog={showDiscardDialog}
        checkContactsWithLabel={checkContactsWithLabel}
        addLabelMode={addLabelMode}
      />
   )
}

export default NavMenu;