import * as React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { Contact } from '../../src/vite-env';
import { InputPropertyValueName } from '../../src/enums';

interface IProps {
   name: string,
   setValue: UseFormSetValue<Contact> ,
   register: UseFormRegister<Contact>,
   repPhoto: string
}

export default function ImageUploadInput(props:IProps){

   const handleImageFileOutput = (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0]
      const imageReader = new FileReader()
      imageReader.readAsDataURL(file)

      imageReader.onload = (e) => {
         const result = e.target?.result;
         if(result){
            // refactoring soon [REASON: Large Image  Data String]
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
               props.repPhoto &&
               <img src={props.repPhoto} alt="Uploaded Image" />
            }
         </output>
      </div>
   )
}