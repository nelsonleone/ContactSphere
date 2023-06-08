import { Button } from '@mantine/core';
import React from 'react';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"
import { AuthFormLocation } from '../../src/enums'


interface IButtonProps {
   location: string,
   buttonType: "button" | "submit",
   loading: boolean
}

export default function LoadingButton(props:IButtonProps){
   return(
     <Button 
       type={props.buttonType} 
       loading={props.loading} 
       disabled={props.loading}
       leftIcon={props.location === AuthFormLocation.SIGN_IN ? <FaSignInAlt size="1rem" /> : <FaUserPlus />} 
       loaderPosition="right"
      >
      {props.location === AuthFormLocation.SIGN_IN ? "Sign In" : "Create Account"}
    </Button>
   )
}