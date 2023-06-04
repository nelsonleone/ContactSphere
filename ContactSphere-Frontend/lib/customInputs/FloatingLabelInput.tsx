import { useState } from 'react'
import { TextInput, createStyles, rem } from '@mantine/core';
import React from 'react';
import { ICustomInputsProps_Password } from '../../src/vite-env';


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
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-35)})` : 'none',
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






export function FloatingLabelInput(props:ICustomInputsProps_Password) {
  const { registerField, error, getValues } = props;
  const [focused, setFocused] = useState(false)
  const { displayName } = getValues()
  const { classes } = useStyles({ floating: displayName.trim().length !== 0 || focused })


  return (
    <div className="floating_input_container">
      <TextInput
        label="Display Name"
        placeholder="Enter Your Display Name"
        classNames={classes}
        {
          ...registerField('displayName',
            {
              required: "This Field is required"
            }
          )
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        name="displayName"
        autoComplete="nope"
        aria-invalid={error ? "true" : "false"}
      />
      {
        error && 
        <p 
          role="alert" 
          aria-label="Display name Input Error"
          >
          {error}
        </p>
      }
    </div>
  )
 }