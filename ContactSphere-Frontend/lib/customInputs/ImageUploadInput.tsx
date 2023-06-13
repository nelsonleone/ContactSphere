import * as React from 'react';

interface IProps {
   name: string
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
            const blob = new Blob([result], { type: file.type })
            const imageUrl = URL.createObjectURL(blob)
            setPhoto(imageUrl)
            console.log(imageUrl)
         }
      }
   }

   return(
      <div className="image_upload_input">
         <input type="file" name={props.name} onChange={handleImageFileOutput} />
         <output>
            <img src={photo} alt="Uploaded Image" />
         </output>
      </div>
   )
}