import { useState, useRef } from 'react'
import { Autocomplete, Loader } from '@mantine/core';
import React from 'react';
import { IFormData, IFormFieldError } from '../../src/vite-env';
interface IProps {
  fieldValue: string,
  error: IFormFieldError | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export function AutocompleteInput(props:IProps) {
  const { setFormData, fieldValue, error } = props;
  const timeoutRef = useRef<number>(-1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current)
    setData([])
    
    setFormData((prevState) => {
      return {...prevState,email: {
        value: val,
        error: val === "" ? {message:"This Field is required"} : null
      }}
    })

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
        value={fieldValue}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Email Address"
        placeholder="Enter Your email"
      />
      {
        error?.message && <p role="alert" aria-label="Email Input Error">{error.message}</p>
      }
    </div>
  )
}