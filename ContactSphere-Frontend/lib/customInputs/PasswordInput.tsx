import React, { useState } from 'react';
import { IFormData, IFormFieldError } from '../../src/vite-env';
import { FaEyeSlash } from 'react-icons/fa'
import { BiShow }  from 'react-icons/bi'

interface IProps {
  fieldValue: string,
  error: IFormFieldError | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function AuthFormPasswordInput(props: IProps) {

  const [showPassword,setShowPassword] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    props.setFormData((prevState) => ({
      ...prevState,
      [name]: {
        value,
        error: value === '' ? {message:'This Field is required'} : null,
      },
    }))
  }

   return (
    <div  className="auth_form_password">
      <div className="input-container">
        <label htmlFor='password'>Password</label>
        {
          !showPassword ?
          <button aria-controls="password" aria-label="Show Password" onClick={() => setShowPassword((prevState) => prevState = !prevState)}>
            <BiShow aria-hidden="true" />
            <span className="AT_only">Show Password</span>
          </button>
          :
          <button aria-controls="password" aria-label="Hide Password" onClick={() => setShowPassword((prevState) => prevState = !prevState)}>
            <FaEyeSlash aria-hidden="true" />
            <span className="AT_only">Hide Password</span>
          </button>
        }
        <input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" onChange={handleChange} id="password" name="password" value={props.fieldValue} /> 
      </div>
      {props.error?.message && (
        <p role="alert" aria-label="Display name Input Error">
          {props.error.message}
        </p>
      )}
    </div>
  )
}