import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

interface IAvatarProps {
  photoURL?: string,
  nameForAlt: string,
  size?: number
}

function PhotoUrlAvatar(props:IAvatarProps) {
  return (
    props.nameForAlt || props.photoURL ?
    <Avatar
      sx={{ bgcolor: deepOrange[400], width: props.size && props.size || 60, height: props.size && props.size || 60 }}
      alt={props.nameForAlt}
      className='avatar'
      src={props.photoURL}
      tabIndex={0}
    />
    :
    <Avatar
      sx={{ bgcolor: deepOrange[400], width: props.size && props.size || 60, height: props.size && props.size || 60 }}
      className='avatar'
      // Static Image Placeholder
      src={'/images/placeholder-for-user.jpg'}
      tabIndex={0}
    />
  )
}

export default PhotoUrlAvatar;