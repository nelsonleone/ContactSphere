import Avatar from '@mui/material/Avatar';

function getRandomColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

interface IAvatarProps {
  photoURL?: string,
  nameForAlt: string,
  size?: number,
  bgColor?: string
}

function PhotoUrlAvatar(props:IAvatarProps) {
  return (
    <Avatar
      sx={{ bgcolor: props.bgColor || getRandomColor(props.nameForAlt), width: props.size && props.size || 60, height: props.size && props.size || 60 }}
      alt={props.nameForAlt}
      className='avatar'
      src={props.photoURL}
    >
      {props.nameForAlt?.slice(0,1)}
    </Avatar>
  )
}

export default PhotoUrlAvatar;