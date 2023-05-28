import { useState, useRef } from 'react'
import { Autocomplete, Loader, TextInput, createStyles, rem } from '@mantine/core';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';


interface IProps {
  fieldValue: string,
  error: string | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export function AutocompleteForm(props:IProps) {
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



const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}))










export function FloatingLabelInput(props:IProps) {
  const [focused, setFocused] = useState(false)
  const { classes } = useStyles({ floating: props.fieldValue.trim().length !== 0 || focused })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setFormData } = props;

    setFormData((prevState) => {
      return {...prevState,[name]: {
        value,
        error: value === "" ? "This Field is required" : null
      }}
    })

    setFormData((prevState) => {
      return {...prevState,[name]: {
        value,
        error: value === "" ? "This Field is required" : null
      }}
    })
  }  

  return (
    <div>
      <TextInput
        label="Password"
        placeholder="Enter Your Password"
        required
        classNames={classes}
        value={props.fieldValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        name="password"
        autoComplete="nope"
        rightSection={<TbFaceIdError stroke={1.5} size="1.1rem" className={classes.icon} />}
      />
      
    </div>
  )
}
