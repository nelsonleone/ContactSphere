import { NavLink } from "react-router-dom";
import { BiUser , BiErrorCircle, BiStar , BiTrashAlt, BiPlus } from 'react-icons/bi'
import { FiEyeOff } from 'react-icons/fi'
import { GrClone } from 'react-icons/gr'
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { IHeaderState } from "./Header";
import { MdLabel } from 'react-icons/md'
import { Breakpoints } from "../enums";
import { DeleteIconButton, EditIconButton } from "../../lib/with-tooltip";
import clientAsyncHandler from "../utils/helperFns/clientAsyncHandler";
import { useEditUserLabelMutation, useRemoveUserLabelMutation } from "../RTK/features/injectedContactsApiQueries";
import handleAsyncRemoveUserLabel from "../utils/helperFns/handleAsyncRemoveUserLabel";
import stopUnauthourizedActions from "../utils/helperFns/stopUnauthourizedActions";
import AddLabelDialog from "../../lib/popups/AddLabelDialog";
import postEdittedLabel from "../utils/helperFns/postEdittedLabel";
import { ILabelObj } from "../vite-env";

interface IProps{
   setState: Dispatch<SetStateAction<IHeaderState>>,
   openNav: boolean
}

function NavMenu(props:IProps){

   const { beenAuthenticated , userDetails: { uid }} = useAppSelector(store => store.authUser)
   const { labels, contacts } = useAppSelector(store => store.userData)   
   const [labelForEdit,setLabelForEdit] = useState<ILabelObj>({
      label: "",
      _id: ""
   })
   const [openDialog,setOpenDialog] = useState(false)
   const [oldLabel,setOldLabel] = useState("")
   const  [removeLabel] = useRemoveUserLabelMutation()
   const [editLabel] = useEditUserLabelMutation()
   const dispatch = useAppDispatch()
   
   const handleClickAway = () => {
      // don't close navMenu automatically on larger screens
      if (window.innerWidth >= Breakpoints.Large )return;
      props.setState(prevState => (
         {
            ...prevState, openNav: false
         }
      ))
   }

   const checkContactsWithLabel = useCallback((label:string) => {
      const withLabel = contacts.filter(c => c.labelledBy.some(obj => obj.label === label)).length;
      return withLabel
   },[contacts.length])

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

   return(
      <>
         <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
            >
            <nav className={props.openNav ? 'main_nav' : 'main_nav hide_nav'} id="main-nav">
               {
                  beenAuthenticated ?
                  <ul>
                     <li>
                        <NavLink to="/" className="contact_page_link">
                           <BiUser title="User icon"  />
                           Contacts
                           {
                              contacts.length ?
                              <span aria-label="Saved Contacts Count">{contacts.length}</span>
                              :
                              null
                           }
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/favourites">
                           <BiStar title="Star icon" />
                           Favourites
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/hidden">
                           <FiEyeOff title="Eye icon"  />
                           Hidden
                        </NavLink>
                     </li>

                     <div>
                        <p id="fxm_id">Fix & manage</p>
                        <li aria-labelledby="fxm_id">
                           <NavLink to="/duplicates">
                              <GrClone title="clone/duplicate icon" />
                              Duplicates
                              <BiErrorCircle title="error icon" />
                           </NavLink>
                        </li>
                        <li aria-labelledby="fxm_id">
                           <NavLink to="/trash">
                              <BiTrashAlt title="Trash"  />
                              Trash
                           </NavLink>
                        </li>
                     </div>

                     <li className="label-area">
                        <button>
                           <span>Labels</span>
                           <BiPlus title="plus icon"  />
                        </button>

                        <ul>
                           {
                              labels && labels.map(value => {
                                 return(
                                    <li key={value._id} >
                                       <NavLink to={`/labels/${value._id}`}>
                                          <MdLabel aria-label="Label Icon" />
                                          <span>{value.label}</span>
                                          <p aria-label={`contacts-with-${value.label}-label`}>{checkContactsWithLabel(value.label)}</p>
                                          <div className="label_link_btns">
                                             <EditIconButton toolTipText="Rename Label" navigateToEditPage={() => handleOpenDialog(value)} aria-label="Edit" />
                                             <DeleteIconButton toolTipText="Delete Label" handleDelete={() => handleLabelDelete(value.label)} />
                                          </div>
                                       </NavLink>
                                    </li>
                                 )
                              })
                           }
                        </ul>
                     </li>
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
            setOpen={setOpenDialog} 
         />
      </>
   )
}

export default memo(NavMenu)