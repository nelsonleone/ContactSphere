import { PasswordInput, Text, Group} from '@mantine/core'
import React from 'react';
import { IFormData } from '../../src/vite-env';

interface IProps {
  fieldValue: string,
  error: string | null,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function AuthFormPasswordInput(props: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    props.setFormData((prevState) => ({
      ...prevState,
      [name]: {
        value,
        error: value === '' ? 'This Field is required' : null,
      },
    }))
  }

   return (
    <div>
      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Enter Your password
        </Text>
      </Group>
      <PasswordInput onChange={handleChange} name="password" value={props.fieldValue} placeholder="Your password" id="your-password" />
      {props.error && (
        <p role="alert" aria-label="Display name Input Error">
          {props.error}
        </p>
      )}
    </div>
  )
}