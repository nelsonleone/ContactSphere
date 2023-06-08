import Modal from '@mui/material/Modal'
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'

export default function Loader(){

   const { load } = useAppSelector(store => store.loading)

   return(
      <Modal
         style={{backgroundColor: 'black'}}
         open={load}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <img src="/images/loader-icon.svg" aria-label="loading" alt="Loading" />
      </Modal>
   )
}