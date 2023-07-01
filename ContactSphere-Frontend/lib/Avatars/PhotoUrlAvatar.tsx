import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

interface IChipProps {
  photoURL?: string,
  nameForAlt: string,
  size?: number
}

function PhotoUrlAvatar(props:IChipProps) {
  return (
      <Avatar
        sx={{ bgcolor: deepOrange[400], width: props.size && props.size || 60, height: props.size && props.size || 60 }}
        alt={props.nameForAlt}
        className='avatar'
        src={props.photoURL}
        tabIndex={0}
      >
        {props.nameForAlt.slice(0,1)}
      </Avatar>
  )
}

export default PhotoUrlAvatar;