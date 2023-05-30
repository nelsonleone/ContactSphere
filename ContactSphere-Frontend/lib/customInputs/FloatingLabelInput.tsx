import { useState } from 'react'
import { TextInput, createStyles, rem } from '@mantine/core';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';


interface IProps {
  fieldValue: string,
  error: string | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  inputFor: string
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
  const {  fieldValue, error , inputFor , setFormData } = props;
  const [focused, setFocused] = useState(false)
  const { classes } = useStyles({ floating: fieldValue.trim().length !== 0 || focused })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
        label={inputFor === "displayName" ? "Display Name" : "Password"}
        placeholder={inputFor === "displayName" ? "Enter Your Display Name" : "Enter Your Password"}
        required
        classNames={classes}
        value={fieldValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        name={inputFor === "displayName" ? "displayname" : "password"}
        autoComplete="nope"
        rightSection={<TbFaceIdError stroke={1.5} style={{height:"1.1rem",width:"1.1rem"}} className={classes.icon} />}
      />
      {
        error && 
        <p 
          role="alert" 
          aria-label={inputFor === "displayName" ? "Display name Input Error" : "Password Input Error"}
          >
          {error}
        </p>
      }
    </div>
  )
 }