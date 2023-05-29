import { useState, useRef } from 'react'
import { Autocomplete, Loader, TextInput, createStyles, rem } from '@mantine/core';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';


interface IProps {
  fieldValue: string,
  error: string | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export function AutocompleteInput(props:IProps) {
  const { setFormData, fieldValue, error } = props;
  const timeoutRef = useRef<number>(-1)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current)
    setValue(val)
    setData([])

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false)
    } else {
      setLoading(true)
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false)
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`))
      }, 1000)
    }

    setFormData((prevState) => {
      return {...prevState,password: {
        value: val,
        error: value === "" ? "This Field is required" : null
      }}
    })

  }

  return (
    <Autocomplete
      value={fieldValue}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label="Async Autocomplete data"
      placeholder="Enter Your email"
    />
  )
}