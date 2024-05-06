import * as React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { Contact } from '../../src/vite-env';
import { InputPropertyValueName } from '../../src/enums';

interface IProps {
   name: string,
   setValue: UseFormSetValue<Contact> ,
   control: Control<any>,
   repPhoto: string,
   setMadeImageUpload: React.Dispatch<React.SetStateAction<boolean>>
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
            props.setMadeImageUpload(true)
            props.setValue(InputPropertyValueName.RepPhoto,result as string)
         }
      }
   }

   return(
      <div className="image_upload_input">
         <MdOutlineAddPhotoAlternate />
         <input type="file" name={props.name} multiple={false} accept=".jpg, .jpeg, .png, .gif, .pdf" onChange={handleImageFileOutput} />
         <output>
            {
               props.repPhoto &&
               <img src={props.repPhoto} alt="Uploaded Image" />
            }
         </output>
      </div>
   )
}