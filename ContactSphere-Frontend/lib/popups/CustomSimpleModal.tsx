import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
}

export default function BasicModal() {
  
   const { showSimpleModal, text1, text2 } = useAppSelector(store => store.simpleModal)
   const dispatch = useAppDispatch()

   const handleClose = () => {
      dispatch(setHideSimpleModal())
   }

   const watchForClose = setTimeout(() => {
      dispatch(setHideSimpleModal())
   }, 4000)

   useEffect(() => {
     if(!showSimpleModal)return;

     watchForClose()
   
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
      >
      <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
            {text1}
         </Typography>
         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text2}
         </Typography>
      </Box>
      </Modal>
   )
}
