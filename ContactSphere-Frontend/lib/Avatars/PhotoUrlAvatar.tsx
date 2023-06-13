import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

interface IChipProps {
   photoURL?: string,
   nameForAlt: string
}

function PhotoUrlAvatar(props:IChipProps) {
  return (
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt={props.nameForAlt}
        src={props.photoURL}
      >
        {props.nameForAlt.slice(0,1)}
      </Avatar>
  )
}

export default PhotoUrlAvatar;