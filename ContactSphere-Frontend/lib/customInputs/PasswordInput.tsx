import React, { useState } from 'react';
import { ICustomInputsProps } from '../../src/vite-env';
import { FaEyeSlash } from 'react-icons/fa'
import { BiShow }  from 'react-icons/bi'



export default function AuthFormPasswordInput(props:ICustomInputsProps) {

  const [showPassword,setShowPassword] = useState<boolean>(false)

  return (
    <div  className="auth_form_password">
      <div className="input-container">
        <label htmlFor='password'>Password</label>
        {
          !showPassword ?
          <BiShow 
            onClick={() => setShowPassword((prevState) => prevState = !prevState)}
            type="button" 
            aria-controls="password" 
            aria-label="Show Password" 
           />
          :
          <FaEyeSlash 
            type="button" 
            aria-label="Hide Password"
            aria-controls="password" 
            onClick={() => setShowPassword((prevState) => prevState = !prevState)}
          />
        }
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Enter Your Password" 
          id="password"
          aria-invalid={props.error ? "true" : "false"}
          {
            ...props.registerField('password',
              {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              }
            )
          }
        /> 
      </div>
      {props.error && (
        <p role="alert" aria-label="Display name Input Error">
          {props.error}
        </p>
      )}
    </div>
  )
}