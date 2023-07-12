import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppSelector, useAppDispatch } from '../../src/customHooks/reduxCustomHooks'
import { setHideSimpleModal } from '../../src/RTK/features/simpleModalSlice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid hsl(182, 87%, 27%)',
  boxShadow: 24,
  p: 4,
  borderRadius: "8px"
}

export default function BasicModal() {
  
   const { showSimpleModal, text1, text2 } = useAppSelector(store => store.simpleModal)
   const dispatch = useAppDispatch()

   const handleClose = () => {
      dispatch(setHideSimpleModal())
   }

   React.useEffect(() => {
     if(!showSimpleModal)return;

     const watchForClose = setTimeout(() => {
         dispatch(setHideSimpleModal())
      }, 6000)
   
      return () => {
         clearTimeout(watchForClose)
      }
   }, [showSimpleModal])
   

   return (
      <Modal
         open={showSimpleModal}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         className="custom_simple_modal"
      >
      <Box sx={style}>
         <h3 id="modal-modal-title">
            {text1}
         </h3>
         <p id="modal-modal-description">
            {text2}
         </p>
      </Box>
      </Modal>
   )
}
