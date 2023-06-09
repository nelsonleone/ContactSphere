import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';


function AltAuthMethods() {
  return (
      <div className='alt_auth_methods'>
         <h3>Continue With..</h3>
         <Button startIcon={<FcGoogle />}>
            Google
         </Button>

         <Button startIcon={ <FaPhoneAlt />}>
            Phone Number
         </Button>
      </div>
  )
}

export default AltAuthMethods;