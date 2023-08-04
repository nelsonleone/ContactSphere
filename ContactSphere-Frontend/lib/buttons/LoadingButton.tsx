import { Button } from '@mantine/core';
import React from 'react';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"
import { AuthFormLocation } from '../../src/enums'


interface IButtonProps {
  location?: string,
  buttonType: "button" | "submit",
  loading: boolean,
  buttonText?: string,
  className?: string
  handleClick?: () => void,
  size?: "sm"|"lg"|"md"
}

export default function LoadingButton(props:IButtonProps){
   return(
      <Button 
       type={props.buttonType} 
       className={props.className}
       loading={props.loading}
       size={props.size}
       disabled={props.loading}
       onClick={() => props.handleClick? props.handleClick() : ""}
       leftIcon={
         props.location === AuthFormLocation.SIGN_IN ? <FaSignInAlt size="1rem" /> :  
         props.location === AuthFormLocation.SIGN_UP ? <FaUserPlus /> :
         ""
        } 
       loaderPosition="right"
      >
      {
       props.location === AuthFormLocation.SIGN_IN ? "Sign In" : 
       props.location === AuthFormLocation.SIGN_UP ? "Create Account" :
       props.buttonText ? props.buttonText : ""
      }
    </Button>
   )
}