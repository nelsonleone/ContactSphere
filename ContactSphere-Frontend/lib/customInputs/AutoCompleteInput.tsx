import { useState, useRef, FormEvent } from 'react'
import { Autocomplete, Loader } from '@mantine/core';
import React from 'react';
import { ICustomInputsProps } from '../../src/vite-env';



export function AutocompleteInput(props:ICustomInputsProps) {
  const { setValue, registerField, error } = props;
  const timeoutRef = useRef<number>(-1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const handleChange = (val:string) => {
    window.clearTimeout(timeoutRef.current)
    setData([])
    
    if (setValue){
      setValue('email',val,{
        shouldValidate:  true
      })
    }
    
    // set value to corresponding registered input field value
    registerField('email',
      {
        required: "This Field is required",
        pattern: {
          value:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid Email Format"
        }
      }
    )


    // handle email domain suggestions
    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false)
    } else {
      setLoading(true)
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false)
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`))
      }, 1000)
    }
  }

  return (
    <div>
      <Autocomplete
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Email Address"
        placeholder="Enter Your email"
        type="email"
        name="email"
      />
      {
        error && <p role="alert" aria-label="Email Input Error">{error}</p>
      }
    </div>
  )
}