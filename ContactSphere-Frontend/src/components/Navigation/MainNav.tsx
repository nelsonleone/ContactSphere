import { NavLink } from "react-router-dom";
import { BiUser , BiErrorCircle, BiStar , BiTrashAlt, BiPlus } from 'react-icons/bi'
import { FiEyeOff } from 'react-icons/fi'
import { GrClone } from 'react-icons/gr'
import { Dispatch, MouseEvent, ReactNode, SetStateAction, useState } from "react";
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { useAppSelector } from '../../customHooks/reduxCustomHooks'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { MdLabel } from 'react-icons/md'
import { DeleteIconButton, EditIconButton } from "../../../lib/with-tooltip";
import AddLabelDialog from "../../../lib/popups/AddLabelDialog";
import { ILabelObj } from "../../vite-env";
import CustomSimpleDialog from "../../../lib/popups/CustomSimpleDialog";

interface IProps {
   labelForEdit: ILabelObj,
   setLabelForEdit: Dispatch<SetStateAction<ILabelObj>>,
   addLabelMode: "edit"|"create",
   openDialog: boolean,
   setOpenDialog: Dispatch<SetStateAction<boolean>>,
   setShowDiscardDialog: Dispatch<SetStateAction<boolean>>,
   showDiscardDialog: boolean,
   handleNavigate: (e:MouseEvent<HTMLAnchorElement>) => void,
   handleClickAway: () => void,
   handleCreateLabelBtnClick: () => void,
   checkContactsWithLabel: (val:string) => ReactNode,
   handleOpenDialog: (val:ILabelObj) => void,
   handleLabelDelete: (val:string) => void,
   handleLabelEdit: () => void,
   handleDialogAction: () => void
}

export default function MainNav(props:IProps){

   const { 
      handleOpenDialog,
      setOpenDialog,
      openDialog,
      handleNavigate, 
      handleClickAway, 
      handleCreateLabelBtnClick ,
      checkContactsWithLabel,
      handleLabelDelete,
      handleLabelEdit,
      handleDialogAction,
      labelForEdit,
      setLabelForEdit,
      addLabelMode
   } = props;
   const { beenAuthenticated } = useAppSelector(store => store.authUser)
   const { labels, contacts } = useAppSelector(store => store.userData)
   const activeContacts = contacts.filter(c => !c.isHidden && !c.inTrash)
   const [showDiscardDialog,setShowDiscardDialog] = useState(false)

   // Navigation Display Var
   const { openNav } = useAppSelector(store => store.openNav)

   return(
      <>
         <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
            >
            <nav className={openNav ? 'main_nav' : 'main_nav hide_nav'} id="main-nav">
               {
                  beenAuthenticated ?
                  <ul>
                     <li>
                        <NavLink to="/" className="contact_page_link" onClick={handleNavigate}>
                           <BiUser title="User icon"  />
                           Contacts
                           {
                              contacts.length ?
                              <span aria-label="Saved Contacts Count">{activeContacts.length > 0 ? activeContacts.length : ""}</span>
                              :
                              null
                           }
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/favourites" onClick={handleNavigate}>
                           <BiStar title="Star icon" />
                           Favourites
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/hidden" onClick={handleNavigate}>
                           <FiEyeOff title="Eye icon"  />
                           Hidden
                        </NavLink>
                     </li>

                     <div>
                        <p id="fxm_id">Fix & manage</p>
                        <li aria-labelledby="fxm_id">
                           <NavLink to="/duplicates" onClick={handleNavigate}>
                              <GrClone title="clone/duplicate icon" />
                              Duplicates
                              <BiErrorCircle title="error icon" />
                           </NavLink>
                        </li>
                        <li aria-labelledby="fxm_id">
                           <NavLink to="/trash" onClick={handleNavigate}>
                              <BiTrashAlt title="Trash"  />
                              Trash
                           </NavLink>
                        </li>
                     </div>

                     <div className="label-area">
                        <button onClick={handleCreateLabelBtnClick}>
                           <span>Labels</span>
                           <BiPlus title="plus icon"  />
                        </button>
                        {
                           labels && labels.map(value => {
                              return(
                                 <li key={value._id} >
                                    <NavLink to={`/labels/${value._id}`} onClick={handleNavigate}>
                                       <MdLabel aria-label="Label Icon" />
                                       <span>{value.label}</span>
                                       <p aria-label={`contacts-with-${value.label}-label`}>{checkContactsWithLabel(value.label)}</p>
                                    </NavLink>
                                    <div className="label_link_btns">
                                       <EditIconButton toolTipText="Rename Label" navigateToEditPage={() => handleOpenDialog(value)} aria-label="Edit" />
                                       <DeleteIconButton toolTipText="Delete Label" handleDelete={() => handleLabelDelete(value.label)} />
                                    </div>
                                 </li>
                              )
                           })
                        }
                     </div>
                  </ul>
                  :
                  <ul>
                     <li>
                        <NavLink to="/auth/signin">
                           <FiLogIn title="Login icon" />
                           Sign In
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/auth/create_account">
                           <FaUserPlus title="User Join"  />
                           Create Account
                        </NavLink>
                     </li>
                  </ul>
               }
            </nav>
         </ClickAwayListener>
         <AddLabelDialog 
            open={openDialog} 
            handleLabelEdit={handleLabelEdit} 
            setLabelForEdit={setLabelForEdit}  
            labelForEdit={labelForEdit.label}
            setOpen={setOpenDialog} 
            mode={addLabelMode}
         />

         <CustomSimpleDialog
            dialogTitle="You have unsaved changes" 
            dialogText="Are you sure you want to discard your unsaved changes?" 
            open={showDiscardDialog} 
            setOpen={setShowDiscardDialog} 
            action={handleDialogAction}
            btnText1="Cancel"
            btnText2="Discard"
         />
      </>
   )
}