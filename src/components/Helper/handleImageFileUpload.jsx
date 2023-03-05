export default function handleImageFileUpload(e,setContactDetails){
   const imageFile = e.target.files[0]
   const fileReader = new FileReader()
   fileReader.readAsDataURL(imageFile)
   fileReader.addEventListener('load',() => {
      const imageData = fileReader.result;
      setContactDetails(prevData => {
         return {...prevData,contactImage:imageData}
      })
   })
}