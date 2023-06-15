import * as React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { Contact } from '../../src/vite-env';
import { InputPropertyValueName } from '../../src/enums';

interface IProps {
   name: string,
   setValue: UseFormSetValue<Contact> ,
   register: UseFormRegister<Contact>
}

export default function ImageUploadInput(props:IProps){

   const [photo, setPhoto] = React.useState<string>('')

   const handleImageFileOutput = (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0]
      const imageReader = new FileReader()
      imageReader.readAsDataURL(file)

      imageReader.onload = (e) => {
         const result = e.target?.result;
         if(result){
            // refactoring soon [REASON: Large Image  Data String]
            setPhoto(result as string)
            props.setValue(InputPropertyValueName.RepPhoto,result as string)
         }
      }
   }

   React.useEffect(() => {
      props.register(InputPropertyValueName.RepPhoto)
   },[])

   return(
      <div className="image_upload_input">
         <MdOutlineAddPhotoAlternate />
         <input type="file" name={props.name} accept=".jpg, .jpeg, .png, .gif, .pdf" onChange={handleImageFileOutput} />
         <output>
            {
               photo &&
               <img src={photo} alt="Uploaded Image" />
            }
         </output>
      </div>
   )
}